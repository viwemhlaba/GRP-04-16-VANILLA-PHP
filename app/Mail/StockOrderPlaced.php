<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\StockOrder;
use Illuminate\Support\Facades\URL;

class StockOrderPlaced extends Mailable
{
    use Queueable, SerializesModels;

    public $stockOrder;

    /**
     * Create a new message instance.
     */
    public function __construct(StockOrder $stockOrder)
    {
        $this->stockOrder = $stockOrder;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'GRP-04-16 Stock Order Placed',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $approveUrl = URL::signedRoute('orders.approve', ['order' => $this->stockOrder->id]);
        $declineUrl = URL::signedRoute('orders.decline', ['order' => $this->stockOrder->id]);

        return new Content(
            markdown: 'emails.orders.placed',
            with: [
                'approveUrl' => $approveUrl,
                'declineUrl' => $declineUrl,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
