import { palette } from "../../../../palette";
import Input from "../../../../components/inputs/input/input";

export default function AccessUrl({accessUrl}){

    const handleDeleteAccessUrl = () => {

    };

    const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    const handleNavigateAccessUrl = () => openInNewTab(accessUrl.url);

    return <div className={`m-4 p-4 rounded-lg ${palette.bg}`}>
    <Input />
    
  </div>
}