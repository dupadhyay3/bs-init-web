# frozen_string_literal: true

class InvoiceMailer < ApplicationMailer
  after_action -> { @invoice.sent! }

  def invoice
    @invoice = params[:invoice]
    recipients = params[:recipients]
    subject = params[:subject]
    @message = params[:message]
    @invoice_url = "#{ENV.fetch("APP_BASE_URL", "getmiru.com")}/invoices/#{@invoice.id}/view"

    pdf = InvoicePayment::PdfGeneration.process(@invoice, company_logo)
    attachments["invoice_#{@invoice.invoice_number}.pdf"] = pdf
    attachments.inline["miruLogoWithText.png"] = File.read("public/miruLogoWithText.png")
    attachments.inline["Instagram.png"] = File.read("public/Instagram.png")
    attachments.inline["Twitter.png"] = File.read("public/Twitter.png")

    mail(to: recipients, subject:, reply_to: "no-reply@miru.com")
  end

  private

    def company_logo
      @invoice.company.logo.attached? ?
        polymorphic_url(@invoice.company.logo) :
        ""
    end
end
