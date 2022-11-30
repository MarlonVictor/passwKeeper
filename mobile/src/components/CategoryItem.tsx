import { Text } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';


export interface CategoryProps {
  id: string;
  title: string;
}

interface Props extends TouchableOpacityProps {
  data: CategoryProps;
}

export function CategoryItem({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <Text bg='gray.600' color='gray.200' borderRadius={4} my={1} p={1} fontSize='xs' textAlign='center'>
        {data.title}
      </Text>
    </TouchableOpacity>
  )
}