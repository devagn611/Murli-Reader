import {
  Box,
  Card,
  Flex,
  Heading,
  Text,
  Link,
  Separator,
  Grid,
} from '@radix-ui/themes';
import { Github, BookOpen, Mail, Calendar } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { JsonLd } from '../components/JsonLd';
import { PageMeta } from '../components/PageMeta';
import { breadcrumbGraph, contactPageGraph } from '../content/seo';
import { aboutCopy, pages, site } from '../content/site';

function About() {
  return (
    <>
      <PageMeta page="about" />
      <JsonLd data={{ '@context': 'https://schema.org', ...breadcrumbGraph('about') }} />
      <JsonLd data={{ '@context': 'https://schema.org', ...contactPageGraph() }} />
      <Card size="4" className="glass-panel">
        <Flex direction="column" gap="6">
          <Box>
            <Breadcrumbs current={pages.about.breadcrumb || 'About'} />
            <Flex justify="center" mb="4">
              <img
                src={site.headerLogoSrc}
                alt={site.shortName}
                className="w-40 h-auto rounded-md"
              />
            </Flex>
            <Heading as="h1" size="8" mb="2" align="center">
              {pages.about.heading}
            </Heading>
            <Text as="p" size="4" color="gray" align="center">
              {aboutCopy.intro}
            </Text>
          </Box>

          <Separator size="4" />

          <Grid columns={{ initial: '1', sm: '2' }} gap="6">
            <Flex direction="column" gap="4">
              <Heading as="h2" size="6">
                Key Information
              </Heading>
              <Flex align="center" gap="3">
                <BookOpen size={20} />
                <Text size="3">
                  <Text weight="bold">{site.bookCount}</Text> {aboutCopy.booksLabel}
                </Text>
              </Flex>
              <Flex align="center" gap="3">
                <Calendar size={20} />
                <Text size="3">
                  {aboutCopy.yearsLabel}{' '}
                  <Text weight="bold">{site.yearStart}</Text> to{' '}
                  <Text weight="bold">{site.yearEnd}</Text>
                </Text>
              </Flex>
            </Flex>

            <Flex direction="column" gap="4">
              <Heading as="h2" size="6">
                {aboutCopy.contactHeading}
              </Heading>
              <Flex align="center" gap="3">
                <Mail size={20} />
                <Link href={`mailto:${site.email}`}>{site.email}</Link>
              </Flex>
              <Flex align="center" gap="3">
                <Github size={20} />
                <Link
                  href={site.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {aboutCopy.githubLabel}
                </Link>
              </Flex>
            </Flex>
          </Grid>
        </Flex>
      </Card>
    </>
  );
}

export default About;
