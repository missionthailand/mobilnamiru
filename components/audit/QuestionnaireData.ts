// Full questionnaire data with 30 questions + branching logic

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  question: string;
  why?: string; // Explanation why we're asking this question
  type: 'single' | 'multi' | 'text';
  options?: QuestionOption[];
  placeholder?: string;
  required?: boolean;
  maxSelections?: number;
}

export interface QuestionSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

// Main questionnaire sections
export const questionnaireSections: QuestionSection[] = [
  {
    id: 'device',
    title: 'Tvé zařízení',
    description: 'Základní informace o tvém telefonu a ekosystému',
    questions: [
      {
        id: 'system_type',
        question: 'Jaký systém používáš?',
        why: 'Podle systému ti dáme specifické tipy a nastavení.',
        type: 'single',
        required: true,
        options: [
          { value: 'ios', label: 'iOS (iPhone)' },
          { value: 'android', label: 'Android' },
        ],
      },
      {
        id: 'device_model',
        question: 'Jaký máš telefon (značka + model) a verzi systému?',
        why: 'Některé funkce závisí na konkrétním modelu a verzi systému.',
        type: 'text',
        placeholder: 'např. iPhone 14 Pro, iOS 17.2',
      },
      {
        id: 'other_devices',
        question: 'Jaké další zařízení používáš?',
        why: 'Pomůže nám navrhnout synchronizaci a propojení mezi zařízeními.',
        type: 'multi',
        options: [
          { value: 'notebook_windows', label: 'Notebook Windows' },
          { value: 'notebook_mac', label: 'MacBook' },
          { value: 'ipad', label: 'iPad / tablet' },
          { value: 'watch_apple', label: 'Apple Watch' },
          { value: 'watch_wear', label: 'Wear OS hodinky' },
          { value: 'second_phone', label: 'Druhý telefon' },
          { value: 'work_phone', label: 'Pracovní telefon' },
          { value: 'none', label: 'Nic dalšího' },
        ],
      },
      {
        id: 'primary_accounts',
        question: 'Jaké účty/služby jsou pro tebe primární?',
        why: 'Budeme vědět, které služby jsou pro tebe klíčové k zabezpečení.',
        type: 'multi',
        options: [
          { value: 'google', label: 'Google' },
          { value: 'apple', label: 'Apple / iCloud' },
          { value: 'microsoft', label: 'Microsoft' },
          { value: 'other', label: 'Jiný' },
        ],
      },
    ],
  },
  {
    id: 'usage',
    title: 'Jak telefon používáš',
    description: 'Pochopím tvé návyky a kde ti telefon pomáhá nebo překáží',
    questions: [
      {
        id: 'top_usage',
        question: 'K čemu telefon používáš nejvíc? (vyber TOP 3)',
        why: 'Podle hlavního využití přizpůsobíme doporučení tvému stylu.',
        type: 'multi',
        maxSelections: 3,
        options: [
          { value: 'work_comm', label: 'Práce - komunikace' },
          { value: 'work_prod', label: 'Práce - produktivita' },
          { value: 'social', label: 'Sociální sítě' },
          { value: 'entertainment', label: 'Zábava / video' },
          { value: 'photo', label: 'Foto / video' },
          { value: 'school', label: 'Škola' },
          { value: 'health', label: 'Zdraví / fitness' },
          { value: 'navigation', label: 'Navigace' },
          { value: 'shopping', label: 'Nákupy' },
          { value: 'banking', label: 'Banka / finance' },
          { value: 'gaming', label: 'Hraní' },
        ],
      },
      {
        id: 'peak_usage_time',
        question: 'Kdy telefon používáš nejvíc?',
        why: 'Doporučíme ti optimální časy pro Focus režimy a ztišení.',
        type: 'single',
        options: [
          { value: 'morning', label: 'Ráno' },
          { value: 'forenoon', label: 'Dopoledne' },
          { value: 'afternoon', label: 'Odpoledne' },
          { value: 'evening', label: 'Večer' },
          { value: 'night', label: 'V noci' },
          { value: 'all_day', label: 'V průběhu celého dne' },
        ],
      },
      {
        id: 'main_goal',
        question: 'Co je tvůj hlavní cíl?',
        why: 'Report zaměříme přesně na to, co chceš změnit.',
        type: 'single',
        required: true,
        options: [
          { value: 'less_stress', label: 'Méně stresu' },
          { value: 'more_focus', label: 'Více soustředění' },
          { value: 'less_scrolling', label: 'Méně scrollingu' },
          { value: 'security', label: 'Bezpečnost' },
          { value: 'work_organization', label: 'Organizace práce' },
          { value: 'all', label: 'Vše dohromady' },
        ],
      },
      {
        id: 'time_to_save',
        question: 'Kolik času denně chceš reálně ušetřit?',
        why: 'Nastavíme realistická očekávání a správnou intenzitu změn.',
        type: 'single',
        options: [
          { value: '15min', label: '15 minut' },
          { value: '30min', label: '30 minut' },
          { value: '60min', label: '60 minut' },
          { value: '90min', label: '90+ minut' },
        ],
      },
      {
        id: 'time_wasting_apps',
        question: 'Které 3 aplikace ti nejvíc berou čas nebo energii?',
        why: 'Na tyto aplikace se zaměříme při nastavení limitů a blokací.',
        type: 'text',
        placeholder: 'např. Instagram, TikTok, YouTube',
      },
      {
        id: 'scrolling_triggers',
        question: 'U kterých situací se ti nejčastěji stane „jen mrknu a ztratím 20 minut"?',
        why: 'Pomůže nám identifikovat vzorce a navrhnout konkrétní bariéry.',
        type: 'multi',
        options: [
          { value: 'waiting', label: 'Čekání' },
          { value: 'boredom', label: 'Nuda' },
          { value: 'stress', label: 'Stres' },
          { value: 'before_sleep', label: 'Před spaním' },
          { value: 'after_wakeup', label: 'Po probuzení' },
          { value: 'at_work', label: 'Při práci' },
          { value: 'wc', label: 'Na WC' },
          { value: 'commute', label: 'V MHD' },
        ],
      },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifikace a návyky',
    description: 'Jak moc tě telefon ruší a co s tím',
    questions: [
      {
        id: 'notification_impact',
        question: 'Notifikace: jak tě ovlivňují?',
        why: 'Zjistíme, jak moc agresivně přistoupit k jejich omezení.',
        type: 'single',
        options: [
          { value: 'ok', label: 'V pohodě' },
          { value: 'sometimes', label: 'Občas ruší' },
          { value: 'often', label: 'Dost ruší' },
          { value: 'total', label: 'Totálně mě trhají' },
        ],
      },
      {
        id: 'phone_check_frequency',
        question: 'Jak často kontroluješ telefon bez jasného důvodu?',
        why: 'Indikátor návykového chování – podle toho upravíme intenzitu rad.',
        type: 'single',
        options: [
          { value: 'rarely', label: 'Málokdy' },
          { value: 'few_daily', label: 'Několikrát denně' },
          { value: 'hourly', label: 'Každou hodinu' },
          { value: 'constantly', label: 'Neustále' },
        ],
      },
      {
        id: 'phone_anxiety',
        question: 'Co se stane, když nemáš telefon po ruce?',
        why: 'Pomáhá nám pochopit tvůj vztah k telefonu a nastavit realistické cíle.',
        type: 'single',
        options: [
          { value: 'nothing', label: 'Nic' },
          { value: 'slight', label: 'Lehký neklid' },
          { value: 'often', label: 'Často neklid' },
          { value: 'panic', label: 'Panika' },
        ],
      },
      {
        id: 'change_radicality',
        question: 'Jak moc chceš být radikální?',
        why: 'Přizpůsobíme styl doporučení – od jemných po razantní změny.',
        type: 'single',
        options: [
          { value: 'minimal', label: 'Minimalismus – co nejmíň' },
          { value: 'balanced', label: 'Balanced' },
          { value: 'power', label: 'Power-user – funkce a automatizace' },
        ],
      },
    ],
  },
  {
    id: 'work',
    title: 'Práce a komunikace',
    description: 'Jak telefon využíváš v práci',
    questions: [
      {
        id: 'work_regime',
        question: 'Jaký je tvůj pracovní režim?',
        why: 'Určí, jak moc propojit osobní a pracovní nastavení.',
        type: 'single',
        options: [
          { value: 'none', label: 'Nepracuju na telefonu' },
          { value: 'sometimes', label: 'Občas' },
          { value: 'daily', label: 'Denně' },
          { value: 'main', label: 'Telefon = hlavní pracovní nástroj' },
        ],
      },
      {
        id: 'communication_channels',
        question: 'Jak řešíš komunikaci? (vyber vše)',
        why: 'Navrhneme optimální nastavení notifikací pro každý kanál.',
        type: 'multi',
        options: [
          { value: 'email', label: 'E-mail' },
          { value: 'whatsapp', label: 'WhatsApp' },
          { value: 'messenger', label: 'Messenger' },
          { value: 'instagram', label: 'Instagram DM' },
          { value: 'telegram', label: 'Telegram' },
          { value: 'signal', label: 'Signal' },
          { value: 'slack', label: 'Slack' },
          { value: 'teams', label: 'Teams' },
          { value: 'calls', label: 'Telefonáty' },
        ],
      },
      {
        id: 'daily_messages',
        question: 'Kolik e-mailů/IM zpráv řešíš denně zhruba?',
        why: 'Vysoký objem = potřeba lepší organizace a filtrování.',
        type: 'single',
        options: [
          { value: '0-20', label: '0–20' },
          { value: '20-50', label: '20–50' },
          { value: '50-150', label: '50–150' },
          { value: '150+', label: '150+' },
        ],
      },
      {
        id: 'calendar_tools',
        question: 'Používáš kalendář a úkoly? Jaké?',
        why: 'Doporučíme integraci a automatizace mezi nástroji.',
        type: 'multi',
        options: [
          { value: 'google_cal', label: 'Google Kalendář' },
          { value: 'apple_cal', label: 'Apple Kalendář' },
          { value: 'outlook', label: 'Outlook' },
          { value: 'todoist', label: 'Todoist' },
          { value: 'reminders', label: 'Reminders' },
          { value: 'notion', label: 'Notion' },
          { value: 'asana', label: 'Asana' },
          { value: 'none', label: 'Nepoužívám' },
        ],
      },
      {
        id: 'notes_location',
        question: 'Poznámky a "rychlé nápady": kde končí?',
        why: 'Najdeme spolehlivý systém, aby se ti nápady neztrácely.',
        type: 'single',
        options: [
          { value: 'notes_app', label: 'Poznámky (app)' },
          { value: 'chat_self', label: 'Chat sám sobě' },
          { value: 'paper', label: 'Papír' },
          { value: 'head', label: 'V hlavě' },
          { value: 'other', label: 'Jinde' },
        ],
      },
    ],
  },
  {
    id: 'apps',
    title: 'Aplikace a obrazovka',
    description: 'Stav tvého telefonu',
    questions: [
      {
        id: 'homescreen_state',
        question: 'Domovská obrazovka: jak to máš teď?',
        why: 'Přehledná obrazovka = méně rozptýlení a rychlejší přístup k důležitému.',
        type: 'single',
        options: [
          { value: 'cluttered', label: 'Přeplněná' },
          { value: 'normal', label: 'Normální' },
          { value: 'minimal', label: 'Minimal' },
          { value: 'unknown', label: 'Nevím' },
        ],
      },
      {
        id: 'app_count',
        question: 'Kolik máš zhruba nainstalovaných aplikací?',
        why: 'Víc aplikací = víc potenciálních rušivých elementů k vyčištění.',
        type: 'single',
        options: [
          { value: '0-30', label: '0–30' },
          { value: '30-80', label: '30–80' },
          { value: '80-150', label: '80–150' },
          { value: '150+', label: '150+' },
        ],
      },
    ],
  },
  {
    id: 'security',
    title: 'Bezpečnost',
    description: 'Ochrana tvých dat a účtů',
    questions: [
      {
        id: 'security_features',
        question: 'Máš zapnuté tyhle bezpečnostní prvky?',
        why: 'Základní bezpečnost je nutnost – zkontrolujeme, co ti chybí.',
        type: 'multi',
        options: [
          { value: 'lock_screen', label: 'Zámek obrazovky (PIN/Face/Touch)' },
          { value: 'biometrics', label: 'Biometrie' },
          { value: 'auto_updates', label: 'Automatické aktualizace' },
          { value: 'find_device', label: 'Najít zařízení' },
          { value: 'security_alerts', label: 'Bezpečnostní upozornění' },
        ],
      },
      {
        id: 'password_manager',
        question: 'Používáš správce hesel?',
        why: 'Silná hesla bez správce jsou prakticky nemožná.',
        type: 'single',
        options: [
          { value: 'yes', label: 'Ano' },
          { value: 'no', label: 'Ne' },
          { value: 'unknown', label: 'Nevím' },
          { value: 'want_advice', label: 'Chci poradit' },
        ],
      },
      {
        id: 'two_factor_auth',
        question: '2FA: kde ho máš zapnuté?',
        why: 'Dvoufaktorové ověření je nejlepší ochrana proti prolomení účtu.',
        type: 'single',
        options: [
          { value: 'email', label: 'E-mail' },
          { value: 'social', label: 'Sociální sítě' },
          { value: 'bank', label: 'Banka' },
          { value: 'cloud', label: 'Cloud' },
          { value: 'work', label: 'Pracovní účty' },
          { value: 'none', label: 'Nemám' },
        ],
      },
      {
        id: 'backup_status',
        question: 'Zálohování: kdy naposledy proběhla úspěšná záloha?',
        why: 'Bez zálohy = riziko ztráty všech dat při poruše nebo krádeži.',
        type: 'single',
        options: [
          { value: 'recent', label: 'Dnes / tento týden' },
          { value: 'month', label: 'Tento měsíc' },
          { value: 'old', label: 'Dávno' },
          { value: 'unknown', label: 'Nevím' },
        ],
      },
      {
        id: 'privacy_preference',
        question: 'Sdílení dat a soukromí: co je pro tebe OK?',
        why: 'Přizpůsobíme nastavení podle tvé tolerance k sdílení dat.',
        type: 'single',
        options: [
          { value: 'max_privacy', label: 'Max soukromí' },
          { value: 'balanced', label: 'Rozumný kompromis' },
          { value: 'not_care', label: 'Neřeším' },
        ],
      },
    ],
  },
  {
    id: 'personal',
    title: 'Osobní nastavení',
    description: 'Poslední otázky pro personalizovaný report',
    questions: [
      {
        id: 'always_available',
        question: 'Existuje něco, co musí zůstat dostupné 24/7?',
        why: 'Tyto kontakty/aplikace nikdy nezablokujeme.',
        type: 'text',
        placeholder: 'např. rodina, děti, práce on-call...',
      },
      {
        id: 'biggest_stress',
        question: 'Co tě na telefonu nejvíc stresuje? (1 věta)',
        why: 'Na tohle se v reportu zaměříme jako první.',
        type: 'text',
        placeholder: 'např. Neustálé notifikace z práce...',
      },
      {
        id: 'desired_change',
        question: 'Jakou změnu bys chtěl/a cítit už za 7 dní?',
        why: 'Stanovíme konkrétní měřitelný cíl pro první týden.',
        type: 'text',
        placeholder: 'např. Klidnější večery bez telefonu...',
      },
      {
        id: 'regime_changes_consent',
        question: 'Souhlasíš s tím, že ti navrhnu i „režimové" změny (nejen technické)?',
        why: 'Některé změny vyžadují úpravu návyků, nejen nastavení telefonu.',
        type: 'single',
        options: [
          { value: 'yes', label: 'Ano' },
          { value: 'rather_yes', label: 'Spíš ano' },
          { value: 'rather_no', label: 'Spíš ne' },
          { value: 'no', label: 'Ne' },
        ],
      },
    ],
  },
];

// Branching questions based on conditions
export interface BranchingSection {
  id: string;
  title: string;
  condition: (answers: Record<string, any>) => boolean;
  questions: Question[];
}

export const branchingSections: BranchingSection[] = [
  // iOS specific
  {
    id: 'ios_branch',
    title: 'iOS specifické',
    condition: (answers) => answers.system_type === 'ios',
    questions: [
      {
        id: 'ios_focus_modes',
        question: 'Používáš Focus režimy / Screen Time?',
        why: 'Tyto funkce jsou základem pro omezení rušení na iPhone.',
        type: 'single',
        options: [
          { value: 'yes', label: 'Ano' },
          { value: 'no', label: 'Ne' },
          { value: 'unknown', label: 'Nevím' },
        ],
      },
      {
        id: 'ios_icloud_sync',
        question: 'iCloud: co synchronizuješ?',
        why: 'Správné nastavení iCloud zajistí zálohu a synchronizaci mezi zařízeními.',
        type: 'multi',
        options: [
          { value: 'photos', label: 'Fotky' },
          { value: 'contacts', label: 'Kontakty' },
          { value: 'notes', label: 'Poznámky' },
          { value: 'backups', label: 'Zálohy' },
          { value: 'keychain', label: 'Klíčenka' },
        ],
      },
    ],
  },
  // Android specific
  {
    id: 'android_branch',
    title: 'Android specifické',
    condition: (answers) => answers.system_type === 'android',
    questions: [
      {
        id: 'android_digital_wellbeing',
        question: 'Používáš Digital Wellbeing / Focus mode?',
        why: 'Základní nástroj pro sledování a omezení času na telefonu.',
        type: 'single',
        options: [
          { value: 'yes', label: 'Ano' },
          { value: 'no', label: 'Ne' },
          { value: 'unknown', label: 'Nevím' },
        ],
      },
      {
        id: 'android_backup_method',
        question: 'Záloha: Google One / jinak?',
        why: 'Zkontrolujeme, že máš spolehlivou zálohu všech dat.',
        type: 'single',
        options: [
          { value: 'google_one', label: 'Google One' },
          { value: 'manufacturer', label: 'Záloha výrobce (Samsung, Xiaomi...)' },
          { value: 'other', label: 'Jinak' },
          { value: 'none', label: 'Nezálohuji' },
        ],
      },
    ],
  },
  // Work communication intensive
  {
    id: 'work_intensive',
    title: 'Intenzivní pracovní komunikace',
    condition: (answers) =>
      (answers.work_regime === 'daily' || answers.work_regime === 'main') &&
      (answers.daily_messages === '50-150' || answers.daily_messages === '150+'),
    questions: [
      {
        id: 'work_personal_separation',
        question: 'Máš pracovní a osobní účty oddělené?',
        why: 'Oddělení pomáhá mentálně „vypnout" po práci.',
        type: 'single',
        options: [
          { value: 'yes', label: 'Ano' },
          { value: 'no', label: 'Ne' },
          { value: 'partial', label: 'Částečně' },
        ],
      },
      {
        id: 'response_time_requirement',
        question: 'Jak rychle potřebuješ reagovat?',
        why: 'Nastavíme notifikace podle reálných požadavků, ne podle strachu.',
        type: 'single',
        options: [
          { value: '5min', label: 'Do 5 minut' },
          { value: '1h', label: 'Do 1 hodiny' },
          { value: '3h', label: '1–3 hodiny' },
          { value: 'daily', label: '1× denně' },
        ],
      },
      {
        id: 'response_blockers',
        question: 'Co nejvíc brzdí odpovědi?',
        why: 'Identifikujeme překážky pro rychlejší a efektivnější komunikaci.',
        type: 'multi',
        options: [
          { value: 'notif_chaos', label: 'Chaos v notifikacích' },
          { value: 'finding_info', label: 'Hledání informací' },
          { value: 'attachments', label: 'Přílohy' },
          { value: 'app_switching', label: 'Přepínání aplikací' },
          { value: 'spam', label: 'Spam' },
        ],
      },
    ],
  },
  // Behavior signals
  {
    id: 'behavior_signals',
    title: 'Návykové vzorce',
    condition: (answers) =>
      answers.phone_check_frequency === 'hourly' ||
      answers.phone_check_frequency === 'constantly' ||
      answers.phone_anxiety === 'often' ||
      answers.phone_anxiety === 'panic',
    questions: [
      {
        id: 'addictive_content_types',
        question: 'Který typ obsahu tě vtahuje nejvíc?',
        why: 'Cílíme přesně na aplikace a obsah, který tě nejvíc vtahuje.',
        type: 'multi',
        options: [
          { value: 'reels', label: 'Reels / TikTok' },
          { value: 'news', label: 'Zprávy' },
          { value: 'chats', label: 'Chaty' },
          { value: 'games', label: 'Hry' },
          { value: 'shopping', label: 'Nákupy' },
        ],
      },
      {
        id: 'barrier_preference',
        question: 'Chceš "měkké" nebo "tvrdé" bariéry?',
        why: 'Nastavíme intenzitu omezení podle tvé preference.',
        type: 'single',
        options: [
          { value: 'soft', label: 'Jemné' },
          { value: 'medium', label: 'Střední' },
          { value: 'hard', label: 'Tvrdé' },
        ],
      },
      {
        id: 'spiral_breakers',
        question: 'Co ti nejvíc pomáhá přerušit spirálu?',
        why: 'Využijeme to, co už funguje, a posílíme to v nastavení.',
        type: 'multi',
        options: [
          { value: 'timer', label: 'Časovač' },
          { value: 'block', label: 'Blokace' },
          { value: 'alternative', label: 'Náhradní aktivita' },
          { value: 'goal_reminder', label: 'Připomínka cíle' },
        ],
      },
    ],
  },
  // Security red flags
  {
    id: 'security_flags',
    title: 'Bezpečnostní priority',
    condition: (answers) =>
      answers.password_manager === 'no' ||
      answers.password_manager === 'unknown' ||
      (answers.two_factor_auth && answers.two_factor_auth.includes('none')) ||
      answers.backup_status === 'old' ||
      answers.backup_status === 'unknown',
    questions: [
      {
        id: 'critical_accounts',
        question: 'Které 3 účty jsou pro tebe nejkritičtější?',
        why: 'Tyto účty zabezpečíme jako první – jsou nejdůležitější.',
        type: 'text',
        placeholder: 'např. email, banka, práce...',
      },
      {
        id: 'account_breach_suspicion',
        question: 'Máš někdy podezření na únik účtu?',
        why: 'Pokud ano, dáme ti návod jak to ověřit a zabezpečit.',
        type: 'single',
        options: [
          { value: 'yes', label: 'Ano' },
          { value: 'no', label: 'Ne' },
          { value: 'unknown', label: 'Nevím' },
        ],
      },
    ],
  },
];

// Helper to get all applicable branching sections
export const getApplicableBranches = (answers: Record<string, any>): BranchingSection[] => {
  return branchingSections.filter(section => section.condition(answers));
};

// Get total question count including applicable branches
export const getTotalQuestionCount = (answers: Record<string, any>): number => {
  const mainCount = questionnaireSections.reduce((acc, section) => acc + section.questions.length, 0);
  const branchCount = getApplicableBranches(answers).reduce((acc, section) => acc + section.questions.length, 0);
  return mainCount + branchCount;
};
