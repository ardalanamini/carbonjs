import * as Carbon from "../index";

const locale: Carbon.Locale = {
  name: "pt-br",
  weekdays: "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),
  months: "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
  relativeTime: {
    future: "em %s",
    past: "há %s",
    s: "poucos segundos",
    m: "um minuto",
    mm: "%d minutos",
    h: "uma hora",
    hh: "%d horas",
    d: "um dia",
    dd: "%d dias",
    M: "um mês",
    MM: "%d meses",
    y: "um ano",
    yy: "%d anos",
  },
  ordinal: (n) => `${n}º`,
};

Carbon.locale(locale, false);

export = locale;
