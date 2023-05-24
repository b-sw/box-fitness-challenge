import { Path } from '@box-fc/frontend/domain';
import { Button, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
    path: string;
    icon: IconType;
    description: string;
};

export const NavigationButton = ({ path, icon, description }: Props) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isActiveRoute = (routeName: string): boolean => {
        return pathname.includes(routeName);
    };

    const textColor = isActiveRoute(path) ? 'gray.900' : 'gray.400';
    const iconColor = isActiveRoute(path) ? 'boxBlue.500' : 'gray.400';
    const fontWeight = isActiveRoute(path) ? 'bold' : 'normal';

    return (
        <Button
            onClick={() => navigate(`${Path.DASHBOARD}${path}`)}
            variant={'link'}
            outline="none"
            _focus={{ boxShadow: 'none' }}
            _active={{ boxShadow: 'none' }}
            _hover={{ textDecoration: 'none' }}
            size={'lg'}
        >
            <Flex w={'100%'} pl={5} alignItems={'center'} gap={2}>
                <Icon as={icon} color={iconColor} />
                <Text color={textColor} fontWeight={fontWeight} fontSize={'2xl'}>
                    {description}
                </Text>
                <Spacer />
            </Flex>
        </Button>
    );
};
