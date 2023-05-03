import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { BARI_KOI_API_KEY } from '../../config';
import { useGetUserQuery } from '../../features/auth/authApi';
import BoxWithImage from './BoxWithImage';
import NearbyParking from './NearbyParking';
import PhotoWithOverlay from './PhotoWithOverlay';

function MainPage() {
  const { data: user } = useGetUserQuery<any>(null);

  const latitude: string = JSON.parse(Cookies.get('location') || '{}').location
    .latitude;
  const longitude: string = JSON.parse(Cookies.get('location') || '{}').location
    .longitude;
  const [area, setArea] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const fetchLocations = async (latitude: string, longitude: string) => {
    const response = await axios.get(
      `https://barikoi.xyz/v2/api/search/nearby/${BARI_KOI_API_KEY}/0.1/1?longitude=${longitude}&latitude=${latitude}`
    );

    return response.data;
  };

  useEffect(() => {
    fetchLocations(latitude, longitude).then((res) => {
      setCity(res.places[0].city);
      setArea(res.places[0].area);
      // console.log(res);
    });
  }, [longitude, latitude]);

  return (
    <VStack mt={3} spacing={4} mb={'50px!important'} h={'80vh!important'}>
      <Container>
        <Text
          mb={2}
          bgGradient="linear-gradient(to left, #b928cacf, #553c9a)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="extrabold"
        >
          ParkLink
        </Text>
        <Flex justifyContent={'space-between'} m={2} mb={5}>
          <HStack>
            <Text fontSize={'30px'}>
              <IoLocationSharp />
            </Text>
            <VStack align={'left'}>
              <Text fontSize={'sm'} mb={'0!important'}>
                {area}
              </Text>
              <Text fontWeight={500} fontSize={'md'} mt={'0!important'}>
                {city}, Bangladesh
              </Text>
            </VStack>
          </HStack>

          <Box>
            <Avatar src={user?.profileImage} />
          </Box>
        </Flex>
        <PhotoWithOverlay />
        <BoxWithImage />
        <NearbyParking />
      </Container>
    </VStack>
  );
}

export default MainPage;
