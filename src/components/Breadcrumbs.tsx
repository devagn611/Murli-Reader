import { Flex, Text } from '@radix-ui/themes'
import { Link as RouterLink } from 'react-router-dom'

type BreadcrumbsProps = {
  current: string
}

export function Breadcrumbs({ current }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <Flex asChild gap="2" align="center" mb="3">
        <ol className="flex list-none items-center gap-2 p-0 m-0">
          <li>
            <RouterLink to="/" className="underline-offset-2 hover:underline">
              Home
            </RouterLink>
          </li>
          <li aria-hidden="true">
            <Text color="gray">/</Text>
          </li>
          <li>
            <Text color="gray" aria-current="page">
              {current}
            </Text>
          </li>
        </ol>
      </Flex>
    </nav>
  )
}
