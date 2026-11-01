import { Button, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { Link as RouterLink } from 'react-router-dom'
import { PageMeta } from '../components/PageMeta'
import { pages } from '../content/site'

export default function NotFound() {
  return (
    <>
      <PageMeta page="notFound" />
      <Card size="4" className="glass-panel">
        <Flex direction="column" gap="4" align="center">
          <Heading as="h1" size="8">
            {pages.notFound.heading}
          </Heading>
          <Text as="p" size="3" color="gray" align="center">
            This page is not part of Avyakt Murli Reader. Return home to read
            Hindi Avyakt Murlis from 1969 to 2017.
          </Text>
          <Button asChild>
            <RouterLink to="/">Back to the reader</RouterLink>
          </Button>
        </Flex>
      </Card>
    </>
  )
}
