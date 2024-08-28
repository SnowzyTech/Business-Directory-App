import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, View, Button } from "react-native";
import { Link } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking"

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};



// const SignInWithOAuth = () => {
  

  

//   return (
//     <View>
//       <Link href="/">
//         <Text>Home</Text>
//       </Link>
//       <Button title="Sign in with Google" onPress={onPress} />
//     </View>
//   );
// };
// export default SignInWithOAuth;