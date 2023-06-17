import { Path } from '@box-fc/frontend/domain';
import { useMobileQuery } from '@box-fc/frontend/query';
import { Button, Flex, Icon, MenuItem, Spacer, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
    path: string;
    icon: IconType;
    description: string;
    badge?: ReactNode;
};

export const NavigationButton = ({ path, icon, description, badge }: Props) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { isMobile } = useMobileQuery();

    const isActiveRoute = (routeName: string): boolean => {
        return pathname.includes(routeName);
    };

    const textColor = isActiveRoute(path) ? 'gray.700' : 'gray.500';
    const iconColor = isActiveRoute(path) ? 'boxBlue.500' : 'gray.400';
    const fontWeight = isActiveRoute(path) ? 'bold' : 'normal';

    if (isMobile) {
        return (
            <MenuItem
                icon={
                    <Flex alignItems={'center'}>
                        <Icon as={icon} color={iconColor} />
                    </Flex>
                }
                onClick={() => navigate(`${Path.DASHBOARD}${path}`)}
                rounded={'full'}
                alignItems={'center'}
            >
                <Text color={textColor} fontWeight={fontWeight}>
                    {description}
                </Text>
            </MenuItem>
        );
    }

    return (
        <Flex alignItems={'center'}>
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

            {badge}
        </Flex>
    );
};
