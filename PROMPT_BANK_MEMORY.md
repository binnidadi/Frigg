# Prompt banki og vinnuminni fyrir Frigg

Þetta skjal geymir endurnýtanlega prompta og vinnureglur fyrir Frigg. Það er ekki staðgengill fyrir source-of-truth skjöl, heldur hjálpartæki fyrir Codex, önnur AI coding tools og framtíðar sessions.

## 1. Fastar gæðareglur

```text
Passaðu alltaf upp á vandað íslenskt málfar, orðaval og stafsetningu. Í Frigg eru notendatextar, villuskilaboð, skjöl og skýringar hluti af vörugæðum.
```

```text
Veldu einföldustu réttu lausnina. Varðveittu það sem er gott og breyttu aðeins því sem leysir skilgreint vandamál eða bætir rekjanleika, viðhald eða notagildi.
```

```text
Ekki setja tollflokkun, leyfisskyldu eða reglufylgni fram sem staðreynd nema heimild, regla eða review state styðji niðurstöðuna.
```

```text
Ekki fela stærðfræðilega, peningalega, gjalda-, skatta- eða tollarökfræði inni í LLM-köllum. Slík rökfræði skal vera determinísk, prófanleg og útskýranleg.
```

```text
Eftir hverja lotu skal uppfæra viðeigandi skjöl þannig að staða, næstu skref og leiðin þangað séu skýr.
```

## 2. Startup prompt fyrir nýtt AI session

```text
Þú ert að vinna í Frigg, SaaS-first hugbúnaði fyrir innflutningsumsýslu, tollafgreiðslu, rekjanlega review vinnu, landað kostnaðarverð og samþættingar á íslenskum markaði.

Lestu fyrst:
- AGENTS.md
- README.md
- docs/PROJECT_CONTEXT.md
- docs/AI_WORKFLOW.md
- docs/STATUS.md
- docs/ROADMAP.md
- docs/ARCHITECTURE.md

Skoðaðu núverandi implementation áður en þú breytir skrám.

Staðfestu:
1. hvaða skjöl og skrár skipta máli fyrir verkefnið
2. hvaða constraints gilda
3. hvaða verification commands á að keyra
4. hvort skjöl þurfi að uppfærast samhliða
5. hvaða regression risks þarf að meta

Framkvæmdu síðan minnstu réttu breytinguna og gefðu quality gate áður en haldið er áfram.
```

## 3. Senior implementation prompt

```text
Vinnaðu sem principal implementation engineer og quality gate owner.

Byrjaðu á implementation reality:
- files touched
- tengd modules
- architecture fit
- naming, types, validation og contracts
- business logic boundaries
- error handling
- audit og traceability ef við á
- regression risk
- tests og migration/data impact

Ef quality gate stenst ekki, lagaðu áður en þú heldur áfram.
```

## 4. Code review prompt

```text
Yfirfarðu breytingarnar eins og strangur senior code reviewer.

Leitaðu sérstaklega að:
- bugs eða röngum assumptions
- TypeScript/type errors
- brotnu schema eða API contract
- veikri validation
- silent failures
- óljósri business logic afmörkun
- ósamræmi við Frigg domain model
- vöntun á audit/review traceability
- ófullnægjandi prófunum
- secrets eða raw gögnum í repo

Skilaðu niðurstöðu í röð:
1. Critical blockers
2. Should fix
3. Nice to have
4. Nákvæmar breytingatillögur
5. Verification commands
6. Final quality gate
```

## 5. Debugging prompt

```text
Greindu vandamálið áður en þú breytir.

Vinnulag:
1. Endursegðu villuna eða einkennin.
2. Finndu líklegustu orsakir.
3. Skoðaðu viðeigandi skrár, logs og tests.
4. Veldu minnstu öruggu lagfæringuna.
5. Framkvæmdu breytinguna.
6. Keyrðu viðeigandi verification.
7. Útskýrðu rót vandans og hvernig hann var lagaður.

Ekki giska ef hægt er að staðfesta með kóða, logs eða testum.
```

## 6. UI og SaaS review prompt

```text
Yfirfarðu UI eins og senior SaaS product designer og frontend architect.

Meta skal:
- skýrleika virðis
- upplýsingaskipan
- navigation
- visual hierarchy
- spacing og responsiveness
- accessibility
- button hierarchy
- form states
- empty states
- loading states
- error states
- traust og fagmennsku
- íslenskt málfar
- samræmi milli UI og undirliggjandi virkni

Ef Playwright/browser tools eru tiltæk, skoðaðu raunverulegt localhost UI.

Skilaðu:
1. Must-fix atriði
2. Should-fix atriði
3. Nice-to-have atriði
4. Nákvæmar breytingatillögur
5. Hvaða skrár þarf líklega að breyta
```

## 7. UI implementation prompt

```text
Endurbættu UI fyrir Frigg með áherslu á traust, skýrleika og raunverulegt notagildi.

Kröfur:
- varðveittu virkni
- bættu spacing, hierarchy, responsiveness og accessibility
- notaðu vandaða íslenska microcopy
- ekki gefa falskt öryggi um tollflokkun, leyfisskyldu eða reglufylgni
- ekki breyta backend logic nema nauðsynlegt sé
- ekki bæta við dependency nema það sé skýrt réttlætt
- staðfestu með lint/build og browser test ef hægt er
```

## 8. Security og privacy prompt

```text
Yfirfarðu breytinguna út frá security, privacy og data governance.

Athugaðu sérstaklega:
- API keys og secrets
- environment variables
- raw viðskiptavinagögn
- raw ytri gögn sem mega ekki fara í Git
- auth og session handling
- input validation
- logging á viðkvæmum gögnum
- permissions
- dependency risks
- client/server boundary

Ekki birta secrets. Ef leyndarmál finnst, merktu það sem security issue og færðu lausn í environment handling.
```

## 9. Documentation cleanup prompt

```text
Yfirfarðu skjölin og gerðu þau skýrari, styttri og gagnlegri.

Reglur:
- varðveittu Frigg-specific upplýsingar
- fjarlægðu tvítekningar
- leiðréttu úrelt commands eða röng paths
- bættu við dæmum aðeins þegar þau bæta notagildi
- notaðu vandað íslenskt málfar
- uppfærðu STATUS og ROADMAP ef staða eða næstu skref breytast
```

## 10. Memory merge prompt

```text
Sameinaðu ný AI memory eða workflow skjöl við núverandi Frigg reglur.

Reglur:
- Ekki yfirskrifa project-specific samhengi.
- Veldu alltaf öruggari og verkefnissértækari regluna ef mótsögn er til staðar.
- Fjarlægðu placeholders áður en skjal fer í repo.
- Haltu commands í samræmi við package.json.
- Haltu product name sem Frigg.
- Settu sameiginlegt agent workflow í docs/AI_WORKFLOW.md.
- Settu tool-specific reglur í AGENTS.md eða samsvarandi tool skrá.
- Settu endurnýtanlega prompta í PROMPT_BANK_MEMORY.md.
```

## 11. MCP-forgangspromptar

### Context7

```text
Ef verkefnið snertir library eða framework hegðun sem gæti hafa breyst, notaðu Context7 til að sækja viðeigandi skjöl áður en þú leggur til breytingar.
```

### Playwright

```text
Ef verkefnið snertir UI eða notendaflæði, notaðu Playwright/browser tools til að skoða raunverulegt viðmót þegar dev server er tiltækur.
```

### Figma

```text
Notaðu Figma MCP aðeins ef það er rétt stillt með token og verkefnið krefst design-samanburðar. Ekki afrita design blindandi; aðlagaðu með hliðsjón af Frigg, accessibility og maintainability.
```

## 12. Lokasvar prompt

```text
Skilaðu hnitmiðuðu lokasvari:

Breytt:
- ...

Staðfesting:
- Command: ...
- Niðurstaða: ...

Áhætta / handvirk skoðun:
- ...

Final quality gate:
- APPROVED / APPROVED WITH MINOR FOLLOW-UPS / NOT APPROVED

Næsta skref:
- ...
```
