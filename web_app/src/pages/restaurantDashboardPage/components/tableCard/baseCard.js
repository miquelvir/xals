import Card from '../../../../components/card/card';

const defaultAttributes = {
   'w-full': true,
   'md:w-300': true,
   'h-36': true,
   'cursor-pointer': true,
   'transform transition hover:scale-105': true,
   'select-none': true
};

function BaseCard({
   attributes=defaultAttributes,
   ...props
}) {
   return <Card attributes={{...defaultAttributes, ...attributes}} {...props}/>;
}

export default BaseCard;