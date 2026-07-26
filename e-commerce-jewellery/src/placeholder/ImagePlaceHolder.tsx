import { Image } from "lucide-react"

type ImagePlaceholderProps={
    height:number | string,
    width?:number | string,
}

export function ImagePlaceholder({height=400,width='100%'}:ImagePlaceholderProps)
{
    return(
        <div style={{height:`${height}px` , width:`${width}px`, display: 'flex',alignItems: 'center',justifyContent: 'center',border: '2px dashed #ccc'}}>
        <Image/>
        </div>
    )
}