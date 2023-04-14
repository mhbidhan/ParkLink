import { ArrowForwardIcon } from '@chakra-ui/icons';
import GirlWithCarSVG from './svg/girlWithCar';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function SplashScreenOne() {
  return (
    <VStack
      spacing={10}
      p={5}
      textAlign={'center'}
      h={'100vh'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <VStack h={20}></VStack>
      <GirlWithCarSVG />
      <Text as='b' fontSize={'2xl'}>
        Best Parking Spots
      </Text>
      <Text fontSize={'lg'} mt={'5!important'}>
        Find the best, secured
        <br /> and affordable parking near you!
      </Text>
      <Box mt={20}></Box>

      <Link to='/splashtwo'>
        <Box position='fixed' bottom='70px' right={['30px', '84px']} zIndex={1}>
          <Button borderRadius={'100'} w={16} h={16} colorScheme='purple'>
            <ArrowForwardIcon boxSize={8} />
          </Button>
        </Box>
      </Link>
    </VStack>
  );
}

export default SplashScreenOne;