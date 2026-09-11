import { accessoriesData } from "./accessories";
import { ciscoSmallBusinessSwitchesData } from "./cisco-small-business-switches";
import { ciscoUnifiedVoipPhonesData } from "./cisco-unified-voip-phones";
import { controllersData } from "./controllers";
import { firewallsData } from "./firewalls";
import { isrSeriesCardsAndModulesData } from "./isr-series-ards-and-modules";
import { modulesData } from "./modules";
import { pvdmData } from "./pvdm";
import { routersData } from "./routers";
import { switchesData } from "./switches";
import { wanAndVoiceCardsData } from "./wan-and-voice-cards";
import { wirelessAccessPointsData } from "./wireless-access-points";

export const productCatalog = [
  routersData,
  switchesData,
  firewallsData,
  wirelessAccessPointsData,
  controllersData,
  ciscoUnifiedVoipPhonesData,
  isrSeriesCardsAndModulesData,
  wanAndVoiceCardsData,
  pvdmData,
  modulesData,
  accessoriesData,
  ciscoSmallBusinessSwitchesData,
];

export function findCategory(slug: string) {
  return productCatalog.find((c) => c.slug === slug);
}
