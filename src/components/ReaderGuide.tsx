import { Button, Dialog, Flex, Heading, Text } from '@radix-ui/themes'
import { readerGuide } from '../content/site'

type ReaderGuideProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReaderGuide({ open, onOpenChange }: ReaderGuideProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="guide-dialog glass-panel" maxWidth="480px">
        <Dialog.Title className="sr-only">
          {readerGuide.titleEn} / {readerGuide.titleGu}
        </Dialog.Title>
        <Flex direction="column" gap="4">
          <section>
            <Heading as="h2" size="5" mb="2">
              {readerGuide.titleEn}
            </Heading>
            <ol className="guide-list">
              {readerGuide.english.map((step) => (
                <li key={step}>
                  <Text size="3">{step}</Text>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <Heading as="h2" size="5" mb="2">
              {readerGuide.titleGu}
            </Heading>
            <ol className="guide-list">
              {readerGuide.gujarati.map((step) => (
                <li key={step}>
                  <Text size="3">{step}</Text>
                </li>
              ))}
            </ol>
          </section>
          <Button onClick={() => onOpenChange(false)}>
            {readerGuide.closeEn} · {readerGuide.closeGu}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
