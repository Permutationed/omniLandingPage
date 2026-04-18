import { Analytics } from "analytics";
import ployAnalyticsPlugin from "./ploy-plugin";

const analytics = Analytics({
  app: "ploy-site",
  plugins: [ployAnalyticsPlugin()],
});

export default analytics;
