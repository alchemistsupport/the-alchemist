import { Slide } from 'react-awesome-reveal';
import { InstagramEmbed } from 'react-social-media-embed';

export const InstagramPosts = () => {
  return (
    <Slide triggerOnce direction="up">
      <div className="section">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-20">
          <div className="h-[324px] overflow-hidden">
            <div className="-translate-x-[1px] -translate-y-[55px]">
              <InstagramEmbed
                url="https://www.instagram.com/p/CrIJPVnRjxe/"
                width={324}
                height={379}
              />
            </div>
          </div>

          <div className="h-[324px] overflow-hidden">
            <div className="-translate-x-[1px] -translate-y-[55px]">
              <InstagramEmbed
                url="https://www.instagram.com/p/CrDJ-I-xdRi/"
                width={324}
                height={379}
              />
            </div>
          </div>

          <div className="h-[324px] overflow-hidden">
            <div className="-translate-x-[1px] -translate-y-[55px]">
              <InstagramEmbed
                url="https://www.instagram.com/p/Cq2oS6GoV7_/"
                width={324}
                height={379}
              />
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};
