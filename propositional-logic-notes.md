**Cat. vs Prop:** letters represent single terms vs entire phrases
**Consistency:** where assuming two propositions are true leads to no contradiction

**Propositional Logic:** A branch of formal, deductive logic in which the base unit of thought it’s the *proposition*.

**Proposition:** a statement (sentence with a truth value (See [Introductory Logic notes]()

**Truth-functional proposition:** truth value dependent on that of its component parts

**Simple proposition:** has one component part

**Compound proposition:** has multiple component parts

**Propositional constant:** an uppercase letter that represents a single, given proposition

**Propositional variable:** a lowercase letter that represents any proposition

**Logical Operators:** words that combine or modify simple propositions to make compound propositions

**Truth table:** a listing of the possible truth values for a set of one or more propositions

**Defining truth table:** displays the truth values produced by a logical operator modifying a minimum number of variables

**Negation** (~, *not*): the logical operator that denies or contradicts a proposition

**Conjunction** (\*, *and, but*): a logical operator that joins two propositions and is true if and only if both propositions (*conjuncts*) are true

**Disjunction** (∨, *or*): a logical operator that joins two propositions and is true if and only if one or both of the propositions (*disjuncts*) is true

**Conditional** **/ Material Implication** (⊃, *if/then*): a logical operator which asserts that one component (the *antecedent*) implies the other (the *consequent*). *Equivalent to ~(p•~q)*

Antecedent**:** The proposition following the *if*

Consequent: The proposition following the *then*

**Biconditional / Material Equivalence** (≡, if and only if): an operator that is true when both component propositions have the same truth value, and is false when their truth values differ. *Equivalent to (p⊃ q)•(q⊃ p)*

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| p q | (p∨q) | (p•q) | (p⊃q) | (p≡q) |
| T t | T | T | T | T |
| T F | T | F | F | F |
| F T | T | F | T | F |
| F F | F | F | T | T |

**Conditional Translation**

|  |  |
| --- | --- |
| Proposition | Translation |
| If p then q | p⊃q |
| p implies q | p⊃q |
| p only if q | p⊃q |
| When p, q | p⊃q |
| p is sufficient for q | p⊃q |
| p if q | q⊃p |
| p is necessary for q | q⊃p |
| p unless q | ~q⊃p |
| Unless p, q | ~p⊃q |

**Rule of transposition:** (p⊃q)≡(~q⊃~p)

**Logical Equivalence:** to have identical truth values in a table

**Tautology:** a proposition always true due to its logical structure

**Self-contradiction:** a proposition **false** by logical structure

**Validity:** where if the premises are true, the conclusion must be true

**Shorter Truth Table Method for Validity:**

1. Write the argument in symbolic form on a line.
2. Assume the argument is invalid by assigning the premises the value T and the conclusion the value F.
3. Work backwards along the argument, determining the remaining truth values to be T or F as necessary, avoiding contradiction if possible.
4. If the truth values are completed without contradiction, the argument is invalid as assumed; if a contradiction is invalid unavoidable, the assumption is incorrect and argument is valid.

*If no forced truth values occur, a truth value of one variable or constant must be guessed. If no contradiction appears, the argument is invalid; otherwise, the other truth for the variable or constant value must tested.*

**Shorter Truth Table Method for Equivalence:**

1. Write the two propositions in symbolic form on a line.
2. Assume the propositions are not equivalent by assigning one to be T, and the other F.
3. Working backwards, determine the truth values of the components within each proposition.
4. If all components are filled out without contradiction, the assumption is right and the propositions are inequivalent; if one occurs, switch the truth values and repeat.
5. If a contradiction is unavoidable, the statements are equal.

**Dilemma:** a valid argument which presents a choice between two conditionals.

Constructive dilemma**:** (p⊃q) • (r⊃s), p∨r, ∴q∨s

Destructive dilemma**:** (p⊃q) • (r⊃s), ~q∨~s, ∴~p∨~r

*Constructive dilemmas work like modus ponens, while destructive dilemmas work like modus tollens.*

Methods of facing a dilemma:

1. **Going between the horns:** deny the disjunctive premise and provide a third alternative
2. **Grasping the horns:** rejecting one of the conditionals in the conjunctive premise
3. **Rebutting the horns:** providing a counter-dilemma

**Rule of inference:** a valid argument form which can be used to justify steps in a proof
The **nine rules of inference**:

Modus Ponens (M.P.)

p⊃q
p
∴q

Modus Tollens (M.T.)

p⊃q
~q
∴~p

Hypothetical Syllogism (H.S.)

p⊃q
q⊃r
∴p⊃r

Disjunctive Syllogism (D.S.)

pvq
~p
∴q

Constructive Dilemma (C.D.)

(p⊃q)•(r⊃s)
pvr
∴qvs

Conjunction (Conj.)

p
q
∴p•q

Absorption (Abs.)

p⊃q
∴p⊃(p•q)

Simplification (Simp.)

p•q
∴q

Addition (Add.)

p
∴pvq

**Formal proof of validity:** a step-by-step deduction of a conclusion from a set of premises, each step being justified by an appropriate basic rule

**Rules of replacement:** sets of equivalent statements

DeM. ~(p • q) ≡ (~p ∨ ~q)
 ~(p ∨ q) ≡ (~p • ~q)

Com. (p ∨ q) ≡ (q ∨ p)
 (p • q) ≡ (q • p)

Assoc. [p ∨ (q ∨ r)] ≡ [(p ∨ q) ∨ r]
 [p • (q • r)] ≡ [(p • q) • r]

Dist. [p • (q ∨ r)] ≡ [(p • q) ∨ (p • r)]
 [p ∨ (q • r)] ≡ [(p ∨ q) • (p ∨ r)]

D.N. p ≡ ~~p

Trans. (p ⊃ q) ≡ (~q ⊃ ~p)

Impl. (p⊃q) ≡ (~p ∨ q)

Equiv. [p≡q] ≡ [(p⊃q) • (q⊃p)]
 [p≡q] ≡ [(p • q) ∨ (~p • ~q)]

Exp. [(p • q) ⊃ r)] ≡ [p ⊃ (q ⊃ r)]

Taut. p ≡ (p ∨ p)
 p ≡ (p • p)

**Conditional Proof:** a special rule in a formal proof where the antecedent of a conditional is assumed, and used to deduce the consequent. If successful, the entire conditional is concluded.

**Reductio Ad Absurdum:** a special rule in a formal proof where a proposition is negated, and used to find a contradiction. If one exists, the original proposition can be concluded.

**Truth-Functionally Completion:** if and only if all possible combinations of true and false for two variables are derivable using only those logical operators

**Digital Logic:** the branch of formal logic that is applied to electronics

**Bit:** the smallest amount of information that a computer stores.

Byte: eight bits

**Digital Display:** a seven-segment display of a number (0=off, 1=on)

Binary Manipulation:

0 + 0 = 0
0 + 1 = 1
1 + 0 = 0
1 + 1 = 10

0 – 0 = 0
1 – 0 = 1
1 – 1 = 0
10 – 1 = 1

0 x 0 = 0
0 x 1 = 0
1 x 0 = 0
1 x 1 = 1

**Simplification Rules:**Tautology: p v ~p = 1
Self-contradiction: p & ~p = 0

**Algebraic identities**p v 1 = 1
p • 1 = p
p v 0 = p
p • 0 = 0

**EXclusive** **OR**p⊕q
≡ (pvq) • ~(p•q)
≡ (~p•q) v (p•~q)

**EXclusive NOR**p≡q
≡ ~(p⊕q)
≡ (p•q) v ~(pvq)
≡ (pv~q) • (~pvq)

**K-Mapping Rules:**

1. Circle all ‘1’s in rectangular groups, using the least amount of circles of the largest size.
2. For each circled group, Identify the common, unchanging elements and connect them with “AND”.
3. Join each group of elements with “OR” to reach a final proposition.

*Circles must be grouped to powers of 2; circles can wrap around from one side of the K-map to another, and can include its four corners*