import { Slide } from 'react-awesome-reveal';
import { InstagramEmbed } from 'react-social-media-embed';

type Props = {
  links: string[]
}


export const InstagramPosts: React.FC<Props> = ({ links = [] }) => {
  console.log(links)

  return (
    <Slide triggerOnce direction="up">
      <div className="section">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-20">


          {links.map((link: string) => {
            return (
              <div className="h-[324px] overflow-hidden">
                <div className="-translate-x-[1px] -translate-y-[55px]">
                  <InstagramEmbed
                    url={link}
                    width={324}
                    height={379}
                    key={link}
                  />
                </div>
              </div>
            )
          })}


        </div>
      </div>
    </Slide>
  );
};
