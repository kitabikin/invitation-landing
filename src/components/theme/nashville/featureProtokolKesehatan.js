import React from 'react'
import Image from "next/legacy/image"
import _ from 'lodash'
import { Container, Box, Text, SimpleGrid, Center } from '@chakra-ui/react'

import * as Md from 'react-icons/md'

const Icon = props => {
  const { iconName, size, color } = props
  const icon = React.createElement(Md[iconName])
  return <div style={{ fontSize: size, color: color }}>{icon}</div>
}

function FeatureProtokolKesehatan({ ...props }) {
  // Get Data ==================================================================
  // Protokol Kesehatan
  const codeProtokolKesehatan = `${props.options.code}-protokolKesehatan`
  const protokolKesehatan = props.feature[codeProtokolKesehatan].column.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {}
  )
  const {
    [`${codeProtokolKesehatan}-title`]: protokolKesehatanTitle,
    [`${codeProtokolKesehatan}-subTitle`]: protokolKesehatanSubTitle,
    [`${codeProtokolKesehatan}-guide`]: protokolKesehatanGuide,
  } = protokolKesehatan

  // Function ==================================================================
  function isValidHttpUrl(string) {
    let url

    try {
      url = new URL(string)
    } catch (_) {
      return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
  }

  return (
    <>
      <Container h="full" maxW="4xl" centerContent pb="28" px="10">
        <Box position="relative" h="full" w="full" textAlign="center">
          {/* Protokol Kesehatan Title */}
          {protokolKesehatanTitle && protokolKesehatanTitle.is_active && (
            <Text fontFamily="nashvilleHeading" fontSize="3xl">
              {protokolKesehatanTitle.value}
            </Text>
          )}

          {/* Protokol Kesehatan Sub Title */}
          {protokolKesehatanSubTitle && protokolKesehatanSubTitle.is_active && (
            <Text mt="6" fontStyle="italic">
              {protokolKesehatanSubTitle.value}
            </Text>
          )}

          {/* Protokol Kesehatan Guide */}
          {protokolKesehatanGuide && protokolKesehatanGuide.is_active && (
            <SimpleGrid mt="4" columns={[2, null, 4]} spacing="20px">
              {JSON.parse(protokolKesehatanGuide.value).map((data, i) => (
                <Box key={i}>
                  <Center minH="125px">
                    {!isValidHttpUrl(data.image) ? (
                      <Icon iconName={data.image} size={75} />
                    ) : (
                      <Image
                        src={data.image}
                        alt={data.title}
                        height={75}
                        width={75}
                      />
                    )}
                  </Center>
                  <Text fontStyle="italic">{data.title}</Text>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Container>
    </>
  )
}

export default FeatureProtokolKesehatan
