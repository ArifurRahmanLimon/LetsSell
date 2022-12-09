import { Box, useMediaQuery} from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
const HomePage = () => {

    const isNonMobileSreens = useMediaQuery("(min-width : 1000px)");
    // const { _id, picturePath } = useSelector((state) => state.user);
    const picturePath  = "p11.jpeg";
    const _id = '1';

    console.log(`Limon userId : ${_id}`);

    return(
       <Box>
        <Navbar/>

        <Box 
        width = "100%"
        padding = "2rem 6%"
        display={isNonMobileSreens ? "flex" : "block"}
        gap = "0.5rem"
        justifyContent="space-between"
        >

            <Box flexBasis={isNonMobileSreens ? "26%" : undefined}>
                <UserWidget userId={_id} picturePath = {picturePath} />
            </Box>

            <Box
             flexBasis={isNonMobileSreens ? "42%" : undefined}
             mt = {isNonMobileSreens ? undefined : "2rem"}
            >

            </Box>
            {isNonMobileSreens && (
                <Box flexBasis="26%">
                </Box> 
            )}
        </Box>
       </Box>
    )
}

export default HomePage;