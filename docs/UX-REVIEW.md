# UX-greining Tollvarðar Pro

Síðast uppfært: 2026-04-24

## A. Heildarmat

Tollvörð Pro er nú skýrari sem snemmstigs SaaS vara fyrir innflutning og tollafgreiðslu, en undirliggjandi virkni er enn á tæknigrunni. Upplifunin á því að vera heiðarleg: hún má sýna sterka framtíðarsýn og traustmörk, en má ekki gefa í skyn að tollflokkun, leyfisskylda eða landað kostnaðarverð séu komin í production virkni.

Sterkustu gæðin eru skýr afstaða um rekjanleika, AI sem tillögulag og determiníska reiknirökfræði. Veikasti hluti upplifunarinnar er enn skortur á raunverulegu workflow: notandi getur ekki hlaðið inn skjölum, séð review queue, prófað útreikning eða skoðað export.

## B. Mikilvægustu úrbætur í forgangsröð

1. Sýna strax fyrir hvern varan er: innflytjendur, tollmiðlarar, ráðgjafar og fjármálateymi sem þurfa rekjanlega innflutningsumsýslu.
2. Sýna vinnuferlið í fjórum skrefum: lesa skjöl, stinga upp á flokkun, reikna kostnað og undirbúa bókun.
3. Merkja stöðu kerfisins skýrt: tæknigrunnur tilbúinn, gagnalíkan næst, engin production tollflokkun enn.
4. Sýna traustmörkin í UI: AI tillaga, review state og staðfest niðurstaða eru ólík hugtök.
5. Halda tæknimáli í skjölum fremur en á aðalupplifun.

## C. Fljótlegir sigrar

- Nota „Reiknivél fyrir landað kostnaðarverð“ í stað „Engine boundary“ í notendaviðmóti.
- Skipta „Prisma boundary“ og „domain packages“ út fyrir notendamiðað orðalag á forsíðu.
- Bæta við heiðarlegum stöðumerkjum svo traust tapist ekki þegar notandi sér að varan er snemma á vegi.
- Bæta við CTA sem vísar í vegvísi og gagnalíkan án þess að lofa keyrsluhæfri virkni.
- Nota vandaða íslensku í öllum sýnilegum texta og forðast óljós markaðsorð.

## D. Djúpir veikleikar

- Engin navigation er komin, þannig að upplýsingaskipan er aðeins sýnd á einni síðu.
- Engin form, tóm ástand, loading ástand eða villuskilaboð eru komin.
- Engin raunveruleg tenging er enn milli UI og skjala-, flokkunar-, útreiknings- eða export-virkni.
- Traust er lýst í texta, en ekki enn sýnt með raunverulegum audit trail eða review state viðmóti.
- Varan þarf fljótlega fyrsta demo-flæði sem sýnir muninn á tillögu og staðfestri niðurstöðu.

## E. Nákvæmar tillögur að breytingum

- Forsíða skal sýna vörugildi fyrst og tæknistöðu síðar.
- Næsta UI-lota ætti að bæta við `Skjöl`, `Sendingar`, `Yfirferð` og `Staða` sem upplýsingaskipan, jafnvel þótt undirliggjandi virkni sé fyrst read-only.
- Fyrsta tóma ástandið ætti að segja: „Engin innflutningsmál hafa verið stofnuð enn. Í næstu lotu verður hægt að skilgreina sendingar og tengja skjöl við þær.“
- Fyrsta villuskilaboðamynstrið ætti að vera stutt, rekjanlegt og aðgerðarhæft: „Ekki tókst að lesa skjal. Prófaðu aftur eða merktu skjalið til handvirkrar yfirferðar.“
- Þegar schema kemur inn skal UI aldrei sýna „staðfest“ nema `reviewState` eða regla styðji það.

## F. Textatillögur

Hero texti:

„Tollvörð Pro hjálpar innflytjendum og ráðgjöfum að lesa fylgiskjöl, rekja tollflokkunartillögur, undirbúa landað kostnaðarverð og flytja niðurstöður í bókhald án þess að fela óvissu.“

Trauststexti:

„AI niðurstöður eru merktar sem tillögur þar til þær hafa verið yfirfarnar eða studdar með rekjanlegri reglu.“

Tómt ástand:

„Engin innflutningsmál eru komin inn. Næsta skref er að stofna sendingu og tengja við hana reikning, farmbréf eða annað fylgiskjal.“

Villuskilaboð:

„Ekki tókst að vinna úr skjalinu. Skjalið hefur ekki áhrif á tollflokkun eða kostnaðarútreikning fyrr en það hefur verið yfirfarið.“
