# Boltzmann Complexity Research: Blog Post Series Plan

A series of blog posts documenting findings from developing and validating a novel code complexity metric. The goal is to provide evidence that the metric has value and reveals real patterns about code.

---

## Series Purpose

**Primary Goal:** Document findings that demonstrate the metric has predictive power and tells us something real about code complexity.

**What readers should take away:**
- This metric predicts maintenance burden (volatility) independent of file size
- Complexity behaves differently across languages in ways that reflect language culture
- Most complexity metrics (including established ones) are largely measuring size
- There's massive unexplained variance in how complexity relates to other properties
- Rigorous validation reveals uncomfortable truths about the field

**What readers should understand:**
- The metric is based on AST structure, not source text
- Depth and branching in the tree contribute to complexity
- It's grounded in information-theoretic / entropy concepts
- Enough intuition to reason about *why* results make sense

**What readers don't need:**
- Enough detail to reimplement the metric
- Specific parameter values or the exact formula
- Implementation specifics

---

## Part I: What Is This and Why Should You Care?

### Post 1: "Measuring Code Complexity From the AST: A New Approach" ✅

**Purpose:** Establish what the metric is conceptually and why it might work

**Content:**
- The problem: existing metrics (Cyclomatic, Cognitive, Halstead) have known limitations
- The insight: complexity lives in the structure (AST), not the text
- Core concepts readers need to reason about results:
  - Deeper nesting = more cognitive load = higher complexity
  - More branches at a node = more possibilities to track = higher complexity
  - Complexity accumulates as you traverse the tree
  - Inspired by entropy/information theory (more structure = more information)
- Brief mention: built an analyser supporting 15 languages

**Why this matters for the series:**
Readers need this foundation to understand why later findings (language differences, volatility correlation) make sense.

---

### Post 2: "Validating a Complexity Metric: How Do You Know It Works?" ✅

**Purpose:** Establish credibility through rigorous methodology

**Content:**
- The validation framework:
  - Convergent validity: correlates with established metrics (r = 0.978 with Cyclomatic)
  - Discriminant validity: measures something different from related constructs (r = 0.32 with Cognitive)
  - Predictive validity: predicts real-world outcomes (volatility)
- The adversarial approach: actively trying to disprove the hypothesis
- Scale: 783 projects, 41,819+ files analysed
- Why most metrics aren't validated this rigorously

**Why this matters for the series:**
Establishes that findings are credible and methodology is sound.

**Update (Jan 2026):** During writing, we discovered the original volatility correlation (r=0.78) was inflated by generated code outliers. After removing 58 generated files (1.5% of data), correlation dropped to r=0.64. Spearman correlation is ρ=0.53. The post now honestly reflects these corrected numbers.

---

## Part II: The Core Evidence

### Post 3: "Complexity Predicts Code Volatility (And It's Not Just File Size)"

**Purpose:** The strongest evidence the metric has value

**Content:**
- Hypothesis: complex code requires more maintenance
- Finding: r = 0.566 correlation with code volatility (structural changes over time)
- The critical test: is this just measuring file size?
- Partial correlation controlling for LOC: r = 0.718 (file-level), r = 0.789 (project-level)
- Key insight: correlation *strengthens* when removing size effects
- What this means: the metric captures something real about maintainability

**Why readers can reason about this:**
If complexity reflects structural depth and branching, and deeply nested code with many decision points is harder to modify safely, then complex code *should* be modified more often as teams struggle to maintain it.

**Update (Jan 2026):** This post needs revision. The r=0.78 figure was inflated by generated code. True correlation is r=0.5-0.6. Also need to be clear that "volatility" is measured using the metric itself (std dev of Lexical Complexity over time), which creates interpretive challenges. See experiment spec in boltzmann-experiment-phase-2/experiments/volatility-confound-analysis/.

---

### Post 4: "Why Bug Prediction Failed (And What I Learned)"

**Purpose:** Honest about failures; pivoting is part of research

**Content:**
- Original hope: complex code should have more bugs
- Result: ρ = 0.096 with "fix:" commits (essentially no relationship)
- Investigation: 11-20% of "fix:" commits aren't bug fixes (formatting, CI, docs)
- The problem was measurement, not the metric
- Why volatility is a better validation target than bugs

**Why this matters:**
Shows intellectual honesty. The metric isn't magic—it predicts some things, not everything. Commit message semantics are unreliable data.

---

### Post 5: "The Uncomfortable Truth: Complexity Metrics Mostly Measure Size"

**Purpose:** A finding about the entire field, not just this metric

**Content:**
- Discovery: Lexical Complexity correlates r > 0.99 with AST node count
- The uncomfortable question: are we just counting nodes?
- The twist: Cyclomatic Complexity has the same problem
- Cross-language confirmation: Python, JavaScript, Go all show this
- Why volatility correlation still matters: it survives controlling for size

**Why readers can reason about this:**
If complexity accumulates through the tree, then more nodes = more complexity is inevitable. The question is whether the *structure* of accumulation matters beyond raw count. The volatility finding suggests it does.

---

## Part III: Language Reveals Culture

### Post 6: "Language Differences in Complexity Patterns"

**Purpose:** Evidence that the metric captures language-specific patterns

**Content:**
- Finding: Complexity-density relationships vary across languages
- Initial hypothesis about Python/JavaScript differences was disproven by larger-scale investigation
- What the data actually shows: within-language variance often exceeds between-language variance
- Project-level factors (team style, codebase age, domain) may matter more than language

**Why readers can reason about this:**
Different languages have different AST structures, but the relationship between complexity and density is more nuanced than simple language-level generalisations. This is a lesson in not over-interpreting early findings.

---

### Post 7: "JavaScript's 0.22 Constant: One Decision Per 4.5 Lines"

**Purpose:** Evidence of emergent regularities the metric reveals

**Content:**
- Discovery: Cyclomatic Complexity density converges to ~0.22 across all JavaScript projects
- Interpretation: human-written JavaScript has a natural decision density
- Architectural patterns visible:
  - Test code: high lexical complexity, low CC (assertions, chaining)
  - Utility code: low lexical complexity, high CC (type checks, branches)
- Files specialise in one type of complexity or the other

**Why this matters:**
The metric (in conjunction with CC) reveals architectural patterns. This is evidence it's measuring something structurally meaningful.

---

### Post 8: "Why Minified Code Corrupted Everything"

**Purpose:** Data quality lesson + reinforces that the metric is structure-sensitive

**Content:**
- Lodash showed r=+0.724 (contradicting all other JavaScript findings)
- Investigation: minified files were corrupting results
- After filtering: r=-0.415 (consistent with other JS projects)
- Lesson: build artifacts have completely different structural properties

**Why readers can reason about this:**
Minification transforms AST structure dramatically (flattening, inlining). If the metric is structure-sensitive, minified code *should* behave differently. This is actually validation that the metric responds to real structural differences.

---

## Part IV: Scale and the Limits of Understanding

### Post 9: "Flask vs Django vs pandas: Context Changes Everything"

**Purpose:** Evidence that codebase composition affects metric behaviour

**Content:**
- Flask (54 files): homogeneous, consistent patterns
- Django (901 files): heterogeneous, metrics disagree more
- pandas (1,341 files): scientific computing, different again
- 31.4% of Django files have CC=0 (config, data files)
- Finding: heterogeneous codebases expose where Lexical and Cyclomatic diverge

**Why this matters:**
The metric behaves predictably based on codebase composition. This is evidence it's responding to real structural properties, not noise.

---

### Post 10: "The 58% Mystery: What We Can't Explain"

**Purpose:** Intellectual honesty about limits; humility about metrics

**Content:**
- Investigation: why do metric correlations vary so much across projects?
- What explains variance:
  - Language: 21.6%
  - Domain: 7.2%
  - Total explained: ~42%
- The mystery: 58% remains unexplained
- Speculation: developer style, team practices, project maturity

**Why this matters:**
Metrics are partial predictors, not deterministic. The unexplained variance is honest acknowledgment of limits. But 42% explained is still substantial evidence the metric captures real patterns.

---

### Post 11: "Why Language Matters More Than Domain"

**Purpose:** A surprising finding with practical implications

**Content:**
- Language explains 3× more variance than business domain
- Attempted domain classification via embeddings captured language instead
- Clojure anomaly: the only language with negative mean correlation
- Implication: language choice has more impact on complexity patterns than what you're building

**Why readers can reason about this:**
If complexity comes from AST structure, and different languages have fundamentally different AST shapes (Lisp vs C-like vs ML-style), then language *should* matter more than domain.

---

### Post 12: "File Archetypes: Universal Patterns Across 42,000 Files"

**Purpose:** Evidence of universal structural patterns

**Content:**
- 42,884 files clustered into 6 archetypes:
  - 44% implementation, 28% infrastructure, rest split across utilities/config/stubs
- Repository archetypes: 58% standard, 20% high-complexity, 4% platforms
- These patterns appear across all languages

**Why this matters:**
The metric reveals universal patterns in how codebases are structured. This is evidence it's measuring something fundamental about code organisation.

---

### Post 13: "903 Python Projects: Why They're All Different"

**Purpose:** Even within a language, project-level factors dominate

**Content:**
- Within-Python variance: mean r=0.23, σ=0.25
- 71.7% positive correlation, 8.3% negative
- What distinguishes outliers: higher complexity variability, not obvious project characteristics
- Implication: project-level coding style matters more than language alone

**Why this matters:**
Reinforces that the metric is sensitive to real structural differences, even within a single language.

---

## Part V: Synthesis and Implications

### Post 14: "What Lexical Complexity Sees That Cyclomatic Doesn't (And Vice Versa)"

**Purpose:** Clarify the unique contribution

**Content:**
- What CC misses: data-heavy files (CC=0 for configs, constants, type definitions)
- What LC captures: declaration complexity, import structure, organisational complexity
- What LC misses: control flow across function boundaries
- Evidence: metrics diverge on heterogeneous codebases, converge on homogeneous ones

**Why readers can reason about this:**
CC counts decision points. LC counts structural complexity. A file with complex data structures but no if/else has high LC, low CC. This is predictable from the conceptual foundations.

---

### Post 15: "Lessons From 6 Months of Metric Research"

**Purpose:** Methodology reflection; credibility through process

**Content:**
- The adversarial approach: always try to disprove your hypothesis
- Why partial correlations matter (raw correlations lie about size)
- Why file-level hides too much (function-level is next)
- When to pivot vs persist (bug prediction → volatility)
- Data quality basics: filter build artifacts

---

### Post 16: "What's Next: Function-Level Analysis and Technical Debt"

**Purpose:** Signal ongoing research; this is a living project

**Content:**
- Moving from file-level to function-level analysis
- Technical debt correlation (SonarQube, 33 Apache projects available)
- Temporal evolution: how complexity changes over project lifetime
- Language-specific calibration challenges

---

## Appendix Posts

### A1: "A Tour of Code Complexity Literature"
McCabe (1976), Halstead (1977), Cognitive Complexity. Historical context. Where Lexical Complexity fits in the lineage.

### A2: "Partial Correlations: Why Raw Correlations Lie"
Tutorial on controlling for confounds. Practical examples from the research. Useful standalone content.

### A3: "The Theoretical Foundations: From Entropy to ASTs"
Deeper dive on *why* depth and branching matter. Information theory, cognitive load research, graph theory. Enough to reason about results, not enough to reimplement.

---

## Series Structure

**17 main posts + 3 appendices = ~20 weeks of content**

| Part | Posts | Purpose |
|------|-------|---------|
| I | 1-2 | Establish concept and credibility |
| II | 3-5 | Core evidence (volatility, failures, size confound) |
| III | 6-8 | Language findings (density paradox, JS constant, minification) |
| IV | 9-13 | Scale findings (codebases, variance, archetypes) |
| V | 14-16 | Synthesis and future |

---

## The Evidence Portfolio

By the end of the series, readers will have seen:

1. **Predictive power:** Volatility correlation (r=0.5-0.6) that survives size controls
2. **Cross-language consistency:** Patterns that make sense given language idioms
3. **Architectural revelation:** File role patterns visible in complexity signatures
4. **Honest limitations:** Bug prediction failure, 58% unexplained variance, size confound
5. **Rigorous methodology:** Adversarial testing, partial correlations, 1.4M files

This builds the case that the metric measures something real and valuable, without providing a recipe to reproduce it.

---

## Writing Guidelines

**Do:**
- Explain *why* results make sense given the conceptual foundation
- Share specific numbers (correlations, file counts, percentages)
- Be honest about failures and limitations
- Reference the scale (1.4M files, 463 repos, 15 languages)

**Don't:**
- Provide the formula or explain how components combine
- Share parameter values or calibration details
- Explain the traversal algorithm or accumulation method
- Make it possible to reimplement from the blog posts

**Tone:**
- Research journey, not product marketing
- Intellectual honesty over advocacy
- Findings speak for themselves
