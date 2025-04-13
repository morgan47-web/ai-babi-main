import Script from "next/script"

export default function Tapfiliate() {
  return (
    <>
      <script
        src="https://script.tapfiliate.com/tapfiliate.js"
        type="text/javascript"
        async
      ></script>
      <Script
        id="tapfiliate"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
        (function(t,a,p){t.TapfiliateObject=a;t[a]=t[a]||function(){ (t[a].q=t[a].q||[]).push(arguments)}})(window,'tap');

        tap('create', '57308-ed760e', { integration: "javascript" });
        tap('detect');
        `,
        }}
      />
    </>
  )
}
