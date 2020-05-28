//Simplesmente para remover erros chatos
export declare class Snotify {
  error: any;
  remove: any;
  prompt: any;
  warning: any;
  info: any;
}
declare module "vue/types/vue" {
  interface Vue {
    $snotify: Snotify;
  }
}
