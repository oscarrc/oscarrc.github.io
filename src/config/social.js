import { SiGithub, SiInstagram, SiKofi } from 'react-icons/si';

const social = {
    github: {
        label: 'Github',
        url: "https://github.com/oscarrc",
        icon: <SiGithub className="h-6 w-6" />
    },
    instagram: {
        label: 'Instagram',
        url: "https://www.instagram.com/oscarrc_web/",
        icon: <SiInstagram className="h-6 w-6" />

    },
    kofi: {
        label: 'Ko-Fi',
        url: "https://ko-fi.com/oscarrc",
        icon: <SiKofi className="h-6 w-6" />
    }
}

export default social;