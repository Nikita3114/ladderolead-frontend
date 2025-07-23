// src/app/faq/page.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is my customer data safe and private?</AccordionTrigger>
          <AccordionContent>
            Yes, absolutely. Your data is yours. We use secure, industry-standard practices to ensure your conversations and extracted lead data are kept private and safe. We are hosted on secure cloud infrastructure, and data is encrypted.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does the WhatsApp integration work?</AccordionTrigger>
          <AccordionContent>
            We use the official WhatsApp Business API through a trusted partner. During onboarding, we will guide you through a simple process to connect your business number. There's no complex setup required on your end.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>What happens after my 1-week free trial ends?</AccordionTrigger>
          <AccordionContent>
            Your account will automatically transition to our Pay-As-You-Go plan. You can continue to use the service, and we will simply invoice you at the end of your 30-day billing cycle for the number of leads generated during that period.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}