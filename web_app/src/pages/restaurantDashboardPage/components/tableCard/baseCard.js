import Card from '../../../../components/card/card';

const defaultAttributes = {
   'flex-grow w-full sm:w-1/2 lg:w-1/3 xl:w-1/4': true,
   'h-36': true,
   'cursor-pointer': true,
   'transform transition': true,
   'select-none': true
};

function BaseCard({
   attributes=defaultAttributes,
   ...props
}) {
   return <Card attributes={{...defaultAttributes, ...attributes}} {...props}/>;
}

export default BaseCard;