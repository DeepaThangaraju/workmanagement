import {FaChartBar} from "react-icons/fa"
import {MdQueryStats} from "react-icons/md"
import { FaWpforms } from "react-icons/fa"
import {ImProfile} from "react-icons/im"

const links=[
    {
        id:1,
        text:'stats',
        path:'/stats',
        icon:<FaChartBar/>
    },
    {
        id:2,
        text:'All Work',
        path:'/allwork',
        icon:<MdQueryStats/>
    },
    {
        id:3,
        text:'Add Work',
        path:'/addwork',
        icon:<FaWpforms/>
    },
    {
        id:4,
        text:'Profile',
        path:'/profile',
        icon:<ImProfile/>
    },
]

export default links