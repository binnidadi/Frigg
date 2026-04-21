# Golden Scenarios Frigg

Síðast uppfært: 2026-04-21

## Markmið

Golden scenarios eru prófagrunnur fyrir Frigg. Þau eiga að tryggja að breytingar á reglum, gögnum eða routing brjóti ekki production logic.

## Fyrsta lota

### GS-001: Fjölgreiðendur og persónuafsláttur

- Starfsmaður fær laun frá tveimur launagreiðendum.
- Persónuafsláttur er nýttur að fullu hjá aðallaunagreiðanda.
- Kerfið þarf að flagga ef aukagreiðandi er ranglega reiknaður í of lágu skattþrepi.

### GS-002: A1 vottorð

- Erlendur starfsmaður með gilt A1-vottorð starfar tímabundið á Íslandi.
- Kerfið þarf að nota lægra tryggingagjald og halda eftir fullri rekjanleika um gildistíma vottorðs.

### GS-003: Veikindi barna

- Starfsmaður notar rétt vegna veikinda barns.
- Laun, frádrættir og explanation mega ekki blanda þessum rétti saman við eigin veikindi.

### GS-004: Fæðingarorlof og hlutastarf

- Starfsmaður er að hluta í starfi og að hluta í greiðslum frá Fæðingarorlofssjóði.
- Kerfið þarf að sýna áhættu á ofnýttum persónuafslætti og krefjast review ef upplýsingar skortir.

### GS-005: Afturvirk leiðrétting

- Nýtt reglusett tekur gildi aftur í tímann.
- Kerfið þarf að búa til retro batch með áhrifum á eldri keyrslur og rekjanlegu diffi.

### GS-006: Routing í réttan sjóð og félag

- Starfsmaður færist yfir í nýtt starf með öðru routing-mynstri.
- Kerfið þarf að nota nýtt routing frá gildistöku en halda eldri keyrslum óbreyttum.

## Acceptance criteria

- Hver sviðsmynd þarf að geta myndað:
  - `PayrollInput`
  - `PayrollRun`
  - `ValidationResult`
  - `Payslip`
  - minnst eitt `AuditEvent`
- Hver sviðsmynd þarf að hafa expected outcome í lesanlegu formi.
