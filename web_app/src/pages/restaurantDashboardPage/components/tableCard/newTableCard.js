import BaseCard from './baseCard';
import { StopWatch } from '../stopWatch/stopWatch';
import { useElapsedMs, msToTime } from '../../../../hooks/useElapsedTime/useElapsedTime';

function NewTableCard({
   ...props
}) {

   return <BaseCard attributes={{'border-4': true, 'border-grey-500': true, 'border-dashed': true}} {...props}>
      <div class='h-full w-full flex flex-wrap content-center text-center justify-center'>
            <p class="font-mono text-4xl">
               new 
            </p>
            </div>
   </BaseCard>;
}

export default NewTableCard;