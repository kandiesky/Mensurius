import { SnotifyToastConfig } from "vue-snotify";

//Simplesmente para remover erros chatos

export declare class Snotify {
  error(
    body: string,
    title?: string,
    config?: SnotifyToastConfig,
    html?: HTMLCollection
  ): void;
  remove(
    body: string,
    title?: string,
    config?: SnotifyToastConfig,
    html?: HTMLCollection
  ): void;
  prompt(
    body: string,
    title?: string,
    config?: SnotifyToastConfig,
    html?: HTMLCollection
  ): void;
  warning(
    body: string,
    title?: string,
    config?: SnotifyToastConfig,
    html?: HTMLCollection
  ): void;
  info(
    body: string,
    title?: string,
    config?: SnotifyToastConfig,
    html?: HTMLCollection
  ): void;
  success(
    body: string,
    title?: string,
    config?: SnotifyToastConfig,
    html?: HTMLCollection
  ): void;
}
declare module "vue/types/vue" {
  interface Vue {
    $snotify: Snotify;
  }
}
