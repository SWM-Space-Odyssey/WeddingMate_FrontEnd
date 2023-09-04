// import * as amplitude from "@amplitude/analytics-browser";
// amplitude.init();

// import amplitude from "amplitude-js";
// import { env } from "utils/config";
// import checkIsMobileApp from "./checkIsMobileApp";

// class AmplitudeManager {
//   uid: string = "";

//   constructor() {
//     if (env.AMPLITUDE_KEY) {
//       amplitude.getInstance().init(env.AMPLITUDE_KEY);
//     }
//   }

//   setUid = (uid: string) => {
//     amplitude.getInstance().setUserId(uid);
//     this.uid = uid;
//   };

//   addProperty = (props: { name: string; value: number }) => {
//     const { name, value } = props;

//     if (amplitude && env.ENV === "production") {
//       const identify = new amplitude.Identify().add(name, value);
//       amplitude.getInstance().identify(identify);
//     }
//   };

//   addOtherUserProperty = (props: {
//     uid: string;
//     name: string;
//     value: number;
//   }) => {
//     const { uid, name, value } = props;

//     if (amplitude && env.ENV === "production") {
//       amplitude.getInstance().setUserId(uid);

//       const identify = new amplitude.Identify().add(name, value);
//       amplitude.getInstance().identify(identify);

//       amplitude.getInstance().setUserId(this.uid);
//     }
//   };

//   logEvent = (event: string, data?: any) => {
//     // 트래킹코드 테스트할때마다 사용하는 코드
//     // console.log("event", event, "data", data);
//     if (amplitude && env.ENV === "production") {
//       amplitude.getInstance().logEvent(event, {
//         …data,
//         environment: checkIsMobileApp() ? "App" : "Web",
//       });
//     }
//   };
// }

// export default new AmplitudeManager();
