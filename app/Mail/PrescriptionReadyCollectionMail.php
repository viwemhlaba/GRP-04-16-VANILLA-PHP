<?php

namespace App\Mail;

use App\Models\Customer\Prescription;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class PrescriptionReadyCollectionMail extends Mailable
{
    use Queueable, SerializesModels;

    public $prescription;
    public bool $isLastRepeat = false;
    public string $patientId;
    public int $remainingRepeats = 0;

    public function __construct(Prescription $prescription)
    {
        $this->prescription = $prescription->load(['items', 'user.customer']);
        $total = (int) ($this->prescription->repeats_total ?? 0);
        $used = (int) ($this->prescription->repeats_used ?? 0);
        $this->remainingRepeats = max($total - $used, 0);
        $this->isLastRepeat = $total > 0 && $used >= $total; // After dispense updated counts passed in
        // Determine patient id: explicit on prescription, else linked customer id_number, else placeholder
        $this->patientId = $this->prescription->patient_id_number
            ?? ($this->prescription->user->customer->id_number ?? 'Not Provided');
    }

    public function build()
    {
        $subjectBase = 'Your Prescription is Ready for Collection';
        if ($this->isLastRepeat) {
            $subjectBase = '[FINAL REPEAT] ' . $subjectBase;
        }

    return $this->subject(User::MAIL_SUBJECT_PREFIX . ' ' . $subjectBase)
            ->markdown('emails.prescription-ready-collection-markdown', [
                'prescription' => $this->prescription,
                'patientId' => $this->patientId,
                'isLastRepeat' => $this->isLastRepeat,
                'remainingRepeats' => $this->remainingRepeats,
            ]);
    }
}
