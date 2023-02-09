import {useState,useEffect} from "react";
import { useRecoilState } from "recoil";
import { selectFile } from "../recoil-states";

function useAddTweet(){
     const [selectedFile, setSelectedFile] = useRecoilState(selectFile);
     const [tweetMessage, setTweetMessage] = useState("");
     const [profile, setProfile] = useState("");
     const [userList, setUserList] = useState();
     const [tweetList, setTweetList] = useState();


     useEffect(() => {
       let profile = JSON.parse(localStorage.getItem("loggedInUser"));
       let usersList = JSON.parse(localStorage.getItem("userList"));
       let tweetsList = JSON.parse(localStorage.getItem("tweetList"));
       setProfile(profile);
       setUserList(usersList);
       setTweetList(tweetsList);
     }, []);

     let { profilePic, name, verified, handlerName, index, tweets } = profile;
     const handleTweetBtnClick = () => {
      //  e.preventDefault();
      
       const fortweetList = {
         profilePic,
         name,
         verified,
         handlerName,
         tweetid: tweets.length+1,
         tweetText: tweetMessage,
         tweetPic: selectedFile,
         retweetCount: 0,
         likeCount: 0,
         viewCount: 0,
         userIndex:index,
         tweetReplies: [],
       };
       localStorage.setItem(
         "tweetList",
         JSON.stringify([fortweetList, ...tweetList])
       );
       setTweetList([fortweetList, ...tweetList]);
       let data = [fortweetList, ...tweets];

       console.log("index:", index);
       let modifiedUser = userList?.map((el, ind) =>
         ind === index ? { ...el, tweets: data } : el
       );

       localStorage.setItem("userList", JSON.stringify(modifiedUser));
       localStorage.setItem(
         "loggedInUser",
         JSON.stringify({ ...profile, tweets: data })
       );
       setProfile({ ...profile, tweets: data });
       setSelectedFile(null);
       setTweetMessage("");
       
     };
     return [tweetMessage, setTweetMessage, handleTweetBtnClick, tweetList];

}
export default useAddTweet;