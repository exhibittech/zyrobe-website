import type { GuideBody } from "@/components/guides/GuidePage";
import { Checklist, GuideLink, GuideTable, Tip } from "@/components/guides/blocks";

const body: GuideBody = {
  sections: [
    {
      id: "start",
      title: "Where do I start?",
      body: (
        <>
          <p>
            Start with one section, not the whole cupboard: one shelf, one drawer or one rail. Take everything out of it,
            so you see each piece on its own, and sort it into four piles:
          </p>
          <ul>
            <li><strong>Keep:</strong> it fits, you like it and you have worn it in the last year.</li>
            <li><strong>Repair or alter:</strong> a loose button, a broken zip or a hem to fix. Set a date to get it done.</li>
            <li><strong>Give away or sell:</strong> good condition, but you don’t wear it.</li>
            <li><strong>Recycle:</strong> worn out, stained or torn beyond repair.</li>
          </ul>
          <p>
            Festive, wedding and sentimental clothes are the exception to the one-year rule. Keep them, but store them
            properly (more on that below).
          </p>
        </>
      ),
    },
    {
      id: "group",
      title: "How should I group my clothes?",
      body: (
        <>
          <p>
            Group by type first: tops, bottoms, dresses, footwear and accessories. Inside each group, sort by colour or by
            use, such as work, casual and festive, whichever matches how you get dressed in the morning.
          </p>
          <p>
            Put what you wear most at eye level and at the front. Clothes you wear a few times a year can go higher up, at
            the back, or on the loft.
          </p>
          <p>
            Zyrobe’s <GuideLink href="/features/digital-wardrobe">digital wardrobe</GuideLink> sorts photos of your clothes by type for you, so you can filter tops, bottoms, footwear and accessories.
          </p>
        </>
      ),
    },
    {
      id: "hang-or-fold",
      title: "What should I hang and what should I fold?",
      body: (
        <>
          <GuideTable
            head={["Hang", "Fold"]}
            rows={[
              ["Shirts, blazers and jackets", "Sweaters and other knits (hangers stretch the shoulders)"],
              ["Dresses, kurtas and anything that creases easily", "T-shirts, jeans and casual trousers"],
              ["Trousers with a crease, over the hanger bar", "Gym wear, nightwear and innerwear"],
            ]}
          />
          <p>
            For drawers, try file folding: fold each piece into a small rectangle and stand it upright, so you can see
            everything at once instead of digging through a stack.
          </p>
          <Tip>
            <p>Silk sarees can get permanent marks along the folds. Store them in cotton or muslin bags, and refold them along different lines every few months.</p>
          </Tip>
        </>
      ),
    },
    {
      id: "off-season",
      title: "Where should off-season and festive clothes go?",
      body: (
        <>
          <p>
            Wash or clean clothes before you store them, and make sure they are completely dry. Then pack them where they
            won’t get in your way, like a top shelf, the loft, an under-bed box or a spare suitcase.
          </p>
          <ul>
            <li>Use breathable cotton or muslin bags for silks and festive wear, not sealed plastic.</li>
            <li>Vacuum bags save a lot of space for bulky winter jackets and quilts.</li>
            <li>Add a moisture absorber to every box, especially before the monsoon.</li>
            <li>Label each box with what is inside.</li>
          </ul>
          <p>
            To keep a cupboard dry before the rains, see our guide to <GuideLink href="/guides/monsoon-wardrobe-guide">what to wear in the monsoon</GuideLink>.
          </p>
        </>
      ),
    },
    {
      id: "small-space",
      title: "How do I organise a small or shared wardrobe?",
      body: (
        <>
          <p>
            Many homes have one almirah for two people, or a cupboard that also holds bedding and bags. Small spaces
            need clear rules more than big ones.
          </p>
          <ul>
            <li>Give each person their own shelves or side, and keep shared items like bedding on the top shelf.</li>
            <li>Use the height: shelf dividers, stacking boxes, and hooks or a hanging organiser on the inside of the door.</li>
            <li>Move off-season and festive clothes out of the main cupboard, into under-bed boxes, a suitcase or the loft.</li>
            <li>Keep only this week’s clothes on the chair-height shelves; everything else goes higher or lower.</li>
          </ul>
        </>
      ),
    },
    {
      id: "remember",
      title: "How do I remember where everything is?",
      body: (
        <>
          <p>            This is where most systems break. Six months later, nobody remembers which suitcase has the winter jackets or            which cupboard at your parents’ home has the wedding sherwani. Label shelves and boxes, and keep a simple record            of where each stored item is. Photos help too: a picture of a box’s contents is quicker to check than opening            every box on the loft.          </p>
          <p>
            The <GuideLink href="/features/clothes-storage-tracker">clothes storage tracker</GuideLink> does this on your phone: name each cupboard, drawer or suitcase, add a photo, and tick the clothes kept there.
          </p>
        </>
      ),
    },
    {
      id: "keep-it",
      title: "How do I keep my wardrobe organised?",
      body: (
        <>
          <p>A few small habits do more than one big clean-out a year:</p>
          <ul>
            <li><strong>One in, one out:</strong> when something new comes in, something old leaves.</li>
            <li><strong>A giveaway bag:</strong> keep one in the cupboard, and drop things in as soon as you decide you won’t wear them.</li>
            <li><strong>A check at each season change:</strong> before summer, the monsoon and winter, swap what is out and what is stored.</li>
          </ul>
          <Checklist
            title="The five-minute weekly reset"
            items={[
              "Hang up or fold everything lying on chairs and beds",
              "Put clean laundry away in its place",
              "Move anything that needs repair to one spot",
              "Return borrowed or misplaced items to their group",
              "Glance at next week and set aside what you will need",
            ]}
          />
        </>
      ),
    },
  ],
  helps: [
    { href: "/features/digital-wardrobe", label: "Digital wardrobe", text: "take a photo of each item; Zyrobe removes the background and notes the type and colour, and shows simple insights about the clothes you own." },
    { href: "/features/clothes-storage-tracker", label: "Storage tracker", text: "note where each item is kept, like a cupboard, a drawer or a suitcase, so you can find it in seconds." },
    { href: "/features/outfit-maker", label: "Outfit maker", text: "put forgotten pieces back to work by building new looks from what you already have." },
    { href: "/features/outfit-planner", label: "Outfit planner", text: "plan the week ahead so clothes go back in their place instead of piling up on a chair." },
  ],
};

export default body;
