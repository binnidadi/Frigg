# AI workflow fyrir Frigg

Þetta skjal skilgreinir sameiginlegt vinnulag fyrir Codex og önnur AI coding tools í Frigg. Markmiðið er að öll tól vinni með sömu gæðakröfum, óháð því hvaða tól er notað.

## 1. Standard workflow

Fylgdu þessari röð:

1. Skilja verkefnið, markmið þess og hvaða domain-svið það snertir.
2. Lesa `AGENTS.md`, `README.md`, `docs/PROJECT_CONTEXT.md`, `docs/STATUS.md` og viðeigandi source-of-truth skjöl.
3. Skoða núverandi implementation áður en breytt er.
4. Greina constraints, áhættu, regression risk og mögulegar aukaverkanir.
5. Velja minnstu réttu breytingu.
6. Framkvæma breytingu á afmörkuðum skrám.
7. Uppfæra tengd skjöl ef staða, workflow, architecture, commands eða product behavior breytist.
8. Keyra viðeigandi verification.
9. Gefa skýrt quality gate.
10. Commit-a og push-a þegar lota er samþykkt og verkefnið krefst þess.

## 2. Ekki gera

AI agent má ekki:

- endurskrifa ótengdan kóða
- breyta design system eða UI direction af handahófi
- bæta við dependency án skýrrar ástæðu
- fjarlægja virkni án skýrrar ástæðu
- breyta API contract, auth, database schema eða routing nema verkefnið krefjist þess
- fullyrða að test/build/lint hafi verið keyrt ef það var ekki keyrt
- skilja eftir óútskýrða óvissu
- vista secrets, API keys, credentials eða raw gögn í repo
- nota eldri vöruheiti í skjölum eða UI
- búa til falskt öryggi um tollflokkun, leyfisskyldu eða reglufylgni

## 3. Frigg-specific gæðakröfur

Breyting telst ekki fullkláruð nema:

- vandamálið sé leyst eða skýr ástæða sé gefin fyrir því sem vantar
- breytingin sé afmörkuð og viðhaldsvæn
- tengdar skrár, schema, docs og domain contracts séu samræmd
- fjárhagsleg og tolltengd rökfræði sé determinísk og prófanleg
- AI niðurstöður séu með review state, confidence eða provider/source metadata eftir því sem við á
- viðeigandi commands hafi verið keyrð eða útskýrt sé af hverju ekki
- lokasvar innihaldi skýra stöðu, prófanir, áhættu og quality gate

## 4. Verification commands

Nota skal commands úr `package.json`:

```bash
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm prisma:validate
corepack pnpm build
```

Fyrir UI verkefni:

```bash
corepack pnpm dev
```

og nota Playwright/browser tools þegar raunhæft er.

## 5. UI verification

Fyrir UI breytingar þarf að meta:

- layout og visual hierarchy
- spacing og responsiveness
- contrast og accessibility
- keyboard navigation
- CTA skýrleika
- form states
- loading states
- empty states
- error states
- íslenskt málfar
- console errors
- hvort UI lofi meiru en undirliggjandi virkni styður

## 6. Documentation updates

Uppfæra skal skjöl þegar breyting hefur áhrif á:

- setup eða commands
- architecture eða domain boundaries
- schema eða migrations
- dependencies
- product behavior
- known issues
- constraints
- developer workflow
- stöðu eða næstu skref

Ekki bæta við löngum skjölum nema þau bæti raunverulegt viðhaldsgildi.

## 7. Data og secrets

- Raw `HREIN_GOGN`, raw viðskiptavinagögn og óhreinsuð ytri gögn mega ekki fara í Git.
- Nota skal `fixtures/synthetic` fyrir prófanir.
- Leyndarmál fara í environment handling, aldrei í repo.
- Ef leyndarmál finnast í samtali, logs eða skrám skal ekki endurbirta þau.

## 8. Forgangsröðun vandamála

Flokkaðu vandamál svona:

1. `Blocker` - kemur í veg fyrir build, runtime eða core flow.
2. `High` - líklegt til að valda bug, security issue, data issue eða slæmri notendaupplifun.
3. `Medium` - bætir gæði, viðhald eða samræmi.
4. `Low` - snyrting eða framtíðarbót.

Ekki laga `Low` atriði ef verkefnið var afmarkað við blocker/high bug nema breytingin sé mjög lítil og örugg.

## 9. Quality gate

Áður en haldið er áfram í næsta workstream skal gefa eitt af:

- `APPROVED`
- `APPROVED WITH MINOR FOLLOW-UPS`
- `NOT APPROVED`

Ef niðurstaðan er `NOT APPROVED`:

- ekki halda áfram
- segðu nákvæmlega hvað þarf að laga
- forgangsraðaðu lagfæringum í réttri röð

## 10. Lokasvar

Lokasvar eftir breytingar skal innihalda:

```text
Breytt:
- ...

Staðfesting:
- Command: ...
- Niðurstaða: ...

Áhætta / handvirk skoðun:
- ...

Final quality gate:
- ...

Næsta skref:
- ...
```

Ef ekkert var breytt, segðu það skýrt og útskýrðu niðurstöðu greiningarinnar.
