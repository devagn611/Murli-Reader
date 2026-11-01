import { Box, Heading } from '@radix-ui/themes'
import { faqItems } from '../content/site'

export function FaqSection() {
  return (
    <Box asChild>
      <section aria-labelledby="faq-heading">
        <Heading as="h2" size="6" id="faq-heading" mb="4">
          Frequently asked questions
        </Heading>
        <dl className="space-y-4">
          {faqItems.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold mb-1">{item.question}</dt>
              <dd className="m-0 text-[var(--gray-11)]">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </Box>
  )
}
