import React from 'react';
import {
  Box,
  Card,
  Flex,
  Heading,
  Text,
  Link,
  Separator,
  Grid,
  Badge,
} from '@radix-ui/themes';
import { Github, BookOpen, Mail, Calendar } from 'lucide-react';

function About() {
  return (
    <Card size="4">
      <Flex direction="column" gap="6">
        <Box>
          <Flex justify="center" mb="4">
            <img
              src="https://asset.brandfetch.io/idnGDhwQlH/id8fL_C_QF.png?updated=1717983438863"
              alt="Murli Reader"
              className="w-40 h-auto rounded-md"
            />
          </Flex>
          <Heading as="h1" size="8" mb="2" align="center">
            About Murli Reader
          </Heading>
          <Text as="p" size="4" color="gray" align="center">
            Om Shanti. This application is dedicated to the students of Brahma
            Kumaris, providing an easy and accessible way to read Avyakt Murlis.
          </Text>
        </Box>

        <Separator size="4" />

        <Grid columns={{ initial: '1', sm: '2' }} gap="6">
          <Flex direction="column" gap="4">
            <Heading as="h3" size="6">
              Key Information
            </Heading>
            <Flex align="center" gap="3">
              <BookOpen size={20} />
              <Text size="3">
                <Text weight="bold">48</Text> Total Books
              </Text>
            </Flex>
            <Flex align="center" gap="3">
              <Calendar size={20} />
              <Text size="3">
                Content from <Text weight="bold">1969</Text> to{' '}
                <Text weight="bold">2017</Text>
              </Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap="4">
            <Heading as="h3" size="6">
              Contact & Contributions
            </Heading>
            <Flex align="center" gap="3">
              <Mail size={20} />
              <Link href="mailto:devagnmaniya611@gmail.com">
                devagnmaniya611@gmail.com
              </Link>
            </Flex>
            <Flex align="center" gap="3">
              <Github size={20} />
              <Link
                href="https://github.com/devagn611/Murli-Reader"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Link>
            </Flex>
          </Flex>
        </Grid>

        {/* <Separator size="4" /> */}

        {/* <Box>
          <Heading as="h3" size="6" mb="3">
            Acknowledgements
          </Heading>
          <Text as="p" size="3" color="gray" mb="4">
            This project was made possible with the help of some fantastic
            open-source libraries.
          </Text>
          <Flex gap="2" wrap="wrap">
            <Badge color="blue" variant="soft">
              React
            </Badge>
            <Badge color="pink" variant="soft">
              Radix UI
            </Badge>
            <Badge color="green" variant="soft">
              Lucide React
            </Badge>
            <Badge color="orange" variant="soft">
              Epub.js
            </Badge>
            <Badge color="purple" variant="soft">
              react-reader
            </Badge>
            <Badge color="gray" variant="soft">
              Vite
            </Badge>
            <Badge color="cyan" variant="soft">
              Tailwind CSS
            </Badge>
          </Flex>
        </Box> */}
      </Flex>
    </Card>
  );
}

export default About;