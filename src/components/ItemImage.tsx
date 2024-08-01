import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { TbBookmark } from 'react-icons/tb';

export default function ItemImage ({ 
  src, 
  alt, 
  key,
}: { 
  src: string 
  alt: string 
  key: string
}) { 

  return (
    <Card 
      shadow="md" 
      isPressable onPress={() => console.log("item pressed")} 
      key={key} 
      className="discover-items"
    >
      <CardBody className="p-0 overflow-visible">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={alt}
          className="object-cover w-full"
          src={src}
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-4 text-left">
        <span className="text-sm">{alt}</span>

        <div className="flex items-center w-full gap-2">
          <Button isIconOnly>
            <TbBookmark/>
          </Button>

          <Button color="primary" fullWidth>
            Generate
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}