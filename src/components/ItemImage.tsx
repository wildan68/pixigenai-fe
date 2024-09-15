import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { useState } from 'react';
import { TbBookmark } from 'react-icons/tb';

export default function ItemImage ({ 
  src, 
  alt, 
}: { 
  src: string 
  alt: string 
}) { 
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card 
      shadow="md" 
      isPressable onPress={() => console.log("item pressed")} 
      className="discover-items"
    >
      <CardBody className="p-0 overflow-visible">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={alt}
          className={`object-cover w-full ${!imageLoaded && 'min-h-[250px]'}`}
          src={import.meta.env.VITE_APP_API_URL + '/assets/webp?id=' + src}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-4 text-left">
        <span className="text-sm">{alt}</span>

        <div className="flex items-center w-full gap-2">
          <Button isIconOnly>
            <TbBookmark/>
          </Button>

          <Button color="primary" fullWidth>
            Re-Generate
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}