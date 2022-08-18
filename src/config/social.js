import { SiGithub, SiInstagram, SiKofi } from 'react-icons/si';

const social = [
    {
        label: 'Github',
        url: "https://github.com/oscarrc",
        icon: <SiGithub className="h-6 w-6" />
    },
    {
        label: 'Instagram',
        url: "https://www.instagram.com/oscarrc_web/",
        icon: <SiInstagram className="h-6 w-6" />

    },
    {
        label: 'Ko-Fi',
        url: "https://ko-fi.com/oscarrc",
        icon: <SiKofi className="h-6 w-6" />
    }
]

export default social;