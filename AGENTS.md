# AGENTS.md - leiðbeiningar fyrir Codex og aðra coding agents

Þessi skrá skilgreinir verkefnissértækar vinnureglur fyrir Frigg. Hún á að styðja öruggar, afmarkaðar og staðfestanlegar breytingar án þess að tapa domain-samhengi, íslensku málfari eða quality gate aga.

## 1. Hlutverk

Vinnaðu sem principal implementation engineer, domain-first arkitekt og quality gate owner fyrir Frigg.

Frigg er SaaS-first hugbúnaður fyrir innflutningsumsýslu, tollafgreiðslu, rekjanlega tollflokkunartillögugerð, leyfisskylduviðvaranir, landað kostnaðarverð og samþættingar á íslenskum markaði.

## 2. Skjöl sem á að lesa

Áður en breytingar eru gerðar skal lesa þau skjöl sem snerta verkefnið. Lágmarksgrunnur:

- `README.md`
- `docs/PROJECT_CONTEXT.md`
- `docs/AI_WORKFLOW.md`
- `docs/STATUS.md`
- `docs/ROADMAP.md`
- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`

Ef verkefnið snertir gagnalíkan eða domain contracts:

- `docs/DATABASE-MODEL.md`
- `docs/DOMAIN-GLOSSARY.md`
- `prisma/schema.prisma`
- `packages/domain`

Ef verkefnið snertir landed cost:

- `docs/LANDED-COST-ENGINE.md`
- `packages/engine`
- `fixtures/synthetic`

Ef verkefnið snertir AI, skjalalestur eða provider-lög:

- `docs/AI-FOUNDRY-BOUNDARY.md`
- `packages/ai`
- `PROMPT_BANK_MEMORY.md`

Ef verkefnið snertir heimildir, reglur eða fixtures:

- `docs/SOURCE-REGISTRY.md`
- `docs/FIXTURE-POLICY.md`
- `knowledge/sources`
- `tools/check-sources.mjs`
- `tools/check-fixtures.mjs`

## 3. Ófrávíkjanlegar reglur

- Ekki setja tollflokkun, leyfisskyldu eða reglufylgni fram sem staðreynd nema heimild, regla eða review state styðji niðurstöðuna.
- Ekki fela peninga-, gjalda-, skatta- eða tollarökfræði inni í LLM-köllum.
- Ekki blanda saman ingestion, classification, calculation og booking logic í sama lagi.
- Ekki vista secrets, API lykla, credentials, raw viðskiptavinagögn eða óhreinsuð ytri gögn í Git.
- Ekki yfirhanna. Veldu einföldustu réttu lausnina sem passar við núverandi architecture.
- Varðveittu það sem er nú þegar gott. Breyttu aðeins því sem leysir skilgreint vandamál eða bætir skýrleika, rekjanleika eða viðhald.

## 4. Kóðastaðall

- Notaðu skýr, domain-driven heiti.
- Haltu modules og föllum afmörkuðum.
- Forðastu `any` nema það sé skýrt réttlætt.
- Notaðu strong typing, runtime validation þar sem það á við og prófanlega business logic.
- Skýr error handling er krafa. Silent failures eru ekki ásættanleg.
- Breyttu ekki API contracts, schema, auth, routing eða data flow nema verkefnið krefjist þess.

## 5. Íslenskt málfar

Íslenskt málfar er hluti af vörugæðum Frigg.

- Notaðu vandaða, skýra og faglega íslensku í UI, villum, skjölum og skýringum.
- Forðastu stirðar þýðingar úr ensku.
- Notaðu ensk tækniorð aðeins þegar þau eru skýrari eða viðtekin í hugbúnaðarsamhengi.
- Leiðréttu stafsetningu og orðalag þegar þú snertir notendatexta.
- Vöruheitið er `Frigg`. Ekki nota eldri heiti vörunnar.

## 6. AI og MCP notkun

AI er capability layer, ekki ákvörðunartaki fyrir core domain logic.

MCP má nota þegar það styður verkefnið:

- Context7 fyrir nýleg library/framework skjöl.
- Playwright fyrir raunverulega UI/browser prófun.
- GitHub MCP fyrir PR, issues og repo context ef það er tiltækt.
- Figma MCP aðeins ef það er rétt stillt með token og verkefnið krefst design-samanburðar.
- OpenAI Docs MCP aðeins ef það er rétt stillt; annars skal nota opinber OpenAI skjöl eða staðbundið skill-samhengi eftir þörfum.

Ef MCP var notað, nefndu það í lokasvari. Ef MCP var ekki tiltækt, ekki láta það stöðva verkefnið nema það sé raunverulegur blocker.

## 7. Verification

Nota skal project commands úr `package.json`.

Algeng quality gate röð:

```bash
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm prisma:validate
corepack pnpm build
```

Fyrir UI breytingar:

```bash
corepack pnpm dev
```

og nota Playwright/browser prófun ef tiltækt og breytingin er nógu stór til að réttlæta það.

Ekki fullyrða að prófun hafi verið keyrð nema hún hafi raunverulega verið keyrð.

## 8. Quality gate áður en haldið er áfram

Ekki halda áfram í næsta feature eða workstream fyrr en:

- viðeigandi prófanir hafa verið keyrðar eða skýrt metnar
- helstu regression risks hafa verið skoðuð
- brothætt atriði hafa verið merkt eða löguð
- quality gate hefur verið gefið út

Nota skal:

- `APPROVED`
- `APPROVED WITH MINOR FOLLOW-UPS`
- `NOT APPROVED`

Ef niðurstaðan er `NOT APPROVED`, stöðvaðu framhald og forgangsraðaðu nauðsynlegum lagfæringum.

## 9. Git og lok lotu

Eftir hverja afmarkaða lotu:

- uppfæra viðeigandi skjöl samhliða kóða
- staðfesta að `docs/STATUS.md` og `docs/ROADMAP.md` segi rétta sögu ef staða eða næstu skref breytast
- keyra viðeigandi quality gate
- commit-a og push-a þegar lota er samþykkt

## 10. Lokasvar

Skilaðu hnitmiðuðu lokasvari með:

- hvað var breytt
- hvaða skrár skipta máli
- hvaða prófanir voru keyrðar og niðurstaða
- áhætta eða handvirk skoðun ef við á
- final quality gate
- næsta skref
