<?php

namespace App\Mail;

use App\Models\Customer\Prescription;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class PrescriptionApprovedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $prescription;

    public function __construct(Prescription $prescription)
    {
        $this->prescription = $prescription->load('items');
    }

    public function build()
    {
        return $this->subject(User::MAIL_SUBJECT_PREFIX . ' Your Prescription Has Been Approved')
            ->markdown('emails.prescription-approved-markdown');
    }
}

