import { palette } from "../../../../palette";

export default function Zone({title=null, children=null}) {
    return <div className={`m-4 p-4 rounded-lg ${palette.surface2}`}>
    {title && <p class={`font-mono select-none text-2xl ${palette.text}`}>
      {title}
    </p>}
    <div className='p-4'>
      {children}
    </div>
  </div>;
}