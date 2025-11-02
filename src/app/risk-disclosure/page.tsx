import { Section } from "@hyper/ui";
import { PageHeader } from "@/components/page-header";
import { AlertTriangle } from "lucide-react";

export default function RiskDisclosurePage() {
  return (
    <div className="space-y-0">
      <PageHeader
        eyebrow="Risk Disclosure"
        title="Important risk information"
        description="Trading and automated trading systems involve substantial risk. Please read this disclosure carefully before requesting demo access."
      />

      {/* Critical Warning */}
      <Section
        id="warning"
        className="bg-amber-50 dark:bg-amber-950/20"
      >
        <div className="flex items-start gap-4 rounded-lg border-2 border-amber-500 bg-amber-100 p-6 dark:bg-amber-900/30">
          <AlertTriangle className="h-6 w-6 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="space-y-3 text-sm">
            <p className="font-semibold text-amber-900 dark:text-amber-100">
              Trading involves substantial risk of loss and is not suitable for all investors.
            </p>
            <p className="text-amber-800 dark:text-amber-200">
              Hyper Trading Automation is currently in analysis and testing phase. This site provides
              demo data only — no live trading is available. Past performance, whether actual or
              simulated, is not indicative of future results.
            </p>
          </div>
        </div>
      </Section>

      {/* Market Risks */}
      <Section
        id="market-risks"
        title="Market & Trading Risks"
        description="Cryptocurrency and digital asset markets are highly volatile"
      >
        <div className="space-y-4 text-sm text-black/70 dark:text-white/70">
          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Price Volatility</h3>
            <p>
              Cryptocurrency prices can fluctuate dramatically in short periods. Price movements of
              20-50% within 24 hours are not uncommon. This volatility can result in substantial
              gains or losses, including total loss of capital.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Leverage Risk</h3>
            <p>
              If leverage is employed, losses can exceed initial investment. Margin calls may force
              liquidation of positions at unfavorable prices. The system includes risk controls, but
              extreme market conditions can overwhelm protective measures.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Liquidity Risk</h3>
            <p>
              Market liquidity can disappear rapidly during stressed conditions. Low liquidity may
              prevent execution at desired prices or prevent exiting positions. Slippage costs can
              significantly impact returns.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Market Structure</h3>
            <p>
              Cryptocurrency markets operate 24/7 with fragmented liquidity across multiple venues.
              Exchange outages, flash crashes, and manipulation can occur. The system monitors venue
              health but cannot eliminate these risks.
            </p>
          </div>
        </div>
      </Section>

      {/* Technology Risks */}
      <Section
        id="technology-risks"
        title="Technology & System Risks"
        description="Automated systems introduce additional technological dependencies"
      >
        <div className="space-y-4 text-sm text-black/70 dark:text-white/70">
          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">System Failure</h3>
            <p>
              Hardware failures, network outages, software bugs, or cyber attacks can disrupt
              operations. While redundancy and monitoring systems are in place, no system is immune
              to failure. Unmonitored positions during outages can result in substantial losses.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Data Accuracy</h3>
            <p>
              The system relies on market data feeds from third-party providers. Data errors, delays,
              or outages can cause incorrect trading decisions. Real-time data monitoring is
              implemented but cannot guarantee perfect accuracy.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Model Risk</h3>
            <p>
              Trading algorithms are based on historical patterns and assumptions that may not hold
              in future market conditions. Model drift, regime changes, and unforeseen market
              dynamics can render strategies ineffective or counterproductive.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Latency & Execution</h3>
            <p>
              Despite sub-120ms signal processing, execution quality depends on network conditions,
              venue response times, and order book dynamics. Latency arbitrage by faster actors can
              impact profitability.
            </p>
          </div>
        </div>
      </Section>

      {/* Regulatory Risks */}
      <Section
        id="regulatory-risks"
        title="Regulatory & Legal Risks"
        description="Cryptocurrency regulation is evolving and uncertain"
      >
        <div className="space-y-4 text-sm text-black/70 dark:text-white/70">
          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Regulatory Uncertainty</h3>
            <p>
              Cryptocurrency and automated trading regulations vary by jurisdiction and are subject
              to change. New laws could restrict trading activities, require registration, impose
              reporting obligations, or prohibit certain strategies entirely.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Jurisdictional Restrictions</h3>
            <p>
              Access to the service may be restricted or prohibited in certain jurisdictions. It is
              your responsibility to comply with local laws. We reserve the right to refuse service
              based on geographic location or regulatory requirements.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Compliance Changes</h3>
            <p>
              Regulatory engagement is ongoing but preliminary. Future compliance requirements may
              necessitate changes to operations, fee structures, or service availability. We cannot
              guarantee continued operation in all jurisdictions.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Tax Implications</h3>
            <p>
              Automated trading may generate frequent taxable events. Tax treatment varies by
              jurisdiction and individual circumstances. Consult a qualified tax professional
              regarding your specific situation.
            </p>
          </div>
        </div>
      </Section>

      {/* Operational Risks */}
      <Section
        id="operational-risks"
        title="Operational Risks"
        description="Business operations carry inherent risks"
      >
        <div className="space-y-4 text-sm text-black/70 dark:text-white/70">
          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Early Stage Company</h3>
            <p>
              Hyper Trading Automation is a startup with limited operating history. The company may
              not achieve profitability, may face funding constraints, or may cease operations.
              There is no guarantee of service continuity.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Key Person Risk</h3>
            <p>
              The system and operations depend significantly on founder Abduxoliq Ashuraliyev. Loss
              of key personnel could disrupt operations or strategy execution.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Third-Party Dependencies</h3>
            <p>
              Operations depend on exchanges, data providers, hosting services, and other third
              parties. Their failures, service changes, or business closures could impact service
              availability and quality.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Custody & Counterparty Risk</h3>
            <p>
              Assets must be held at cryptocurrency exchanges to enable trading. Exchange insolvency,
              hacks, or operational failures could result in partial or total loss of funds.
              Insurance coverage for cryptocurrency assets is limited or unavailable.
            </p>
          </div>
        </div>
      </Section>

      {/* Performance Risks */}
      <Section
        id="performance-risks"
        title="Performance & Return Risks"
        description="There is no guarantee of profitable performance"
      >
        <div className="space-y-4 text-sm text-black/70 dark:text-white/70">
          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">No Guarantee of Returns</h3>
            <p>
              Past performance, whether actual or simulated, does not guarantee future results. The
              system has not been independently audited. Demo data may not reflect live trading
              conditions, costs, or execution quality.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Strategy Decay</h3>
            <p>
              Trading strategies can lose effectiveness over time as markets evolve, competition
              increases, or opportunities diminish. Historical profitable periods do not ensure
              future profitability.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Drawdown Risk</h3>
            <p>
              Extended losing periods are possible. Drawdowns of 20-50% or more can occur. Risk
              controls aim to limit drawdowns but cannot eliminate this risk. You must be prepared
              to withstand substantial temporary losses.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Opportunity Cost</h3>
            <p>
              Capital allocated to trading cannot be deployed elsewhere. Alternative investments may
              provide better risk-adjusted returns depending on market conditions and individual
              circumstances.
            </p>
          </div>
        </div>
      </Section>

      {/* Cybersecurity Risks */}
      <Section
        id="security-risks"
        title="Cybersecurity Risks"
        description="Digital systems face persistent security threats"
      >
        <div className="space-y-4 text-sm text-black/70 dark:text-white/70">
          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Hacking & Unauthorized Access</h3>
            <p>
              Despite security measures including encrypted communications, API key protection, and
              access controls, systems may be vulnerable to sophisticated attacks. Unauthorized
              access could result in theft of funds or sensitive information.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">User Security</h3>
            <p>
              Your security practices directly impact risk. Weak passwords, compromised devices, or
              phishing attacks targeting your accounts could grant attackers access to your trading
              credentials or funds.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-black dark:text-white">Data Breaches</h3>
            <p>
              Personal information and trading data may be exposed through security breaches. While
              we implement industry-standard protections, no system is completely secure.
            </p>
          </div>
        </div>
      </Section>

      {/* Acknowledgment */}
      <Section
        id="acknowledgment"
        title="Your Acknowledgment"
        description="By requesting demo access or using this service, you acknowledge:"
      >
        <ul className="space-y-3 text-sm text-black/70 dark:text-white/70">
          <li>
            ✓ You have read and understood this entire risk disclosure document
          </li>
          <li>
            ✓ You understand that trading involves substantial risk of loss, including total loss
            of capital
          </li>
          <li>
            ✓ You can afford to lose the entire amount you allocate to trading without impacting
            your financial security
          </li>
          <li>
            ✓ You understand that past performance does not guarantee future results
          </li>
          <li>
            ✓ You understand this is a startup in analysis phase with no independent audit completed
          </li>
          <li>
            ✓ You will consult with qualified financial, legal, and tax advisors before proceeding
          </li>
          <li>
            ✓ You are not relying solely on information provided by Hyper Trading Automation
          </li>
          <li>
            ✓ You understand that we do not provide financial advice or investment recommendations
          </li>
        </ul>
      </Section>

      {/* Additional Resources */}
      <Section
        id="resources"
        title="Additional Information"
        description="Important related documents and resources"
      >
        <div className="space-y-3 text-sm text-black/70 dark:text-white/70">
          <p>
            For complete information about service terms and data privacy, please review:
          </p>
          <ul className="space-y-2 ml-4">
            <li>
              • <a href="/terms" className="text-[color:var(--color-accent-primary)] hover:underline">Terms of Service</a>
            </li>
            <li>
              • <a href="/privacy" className="text-[color:var(--color-accent-primary)] hover:underline">Privacy Policy</a>
            </li>
            <li>
              • <a href="/safety" className="text-[color:var(--color-accent-primary)] hover:underline">Safety & Security</a>
            </li>
            <li>
              • <a href="/status" className="text-[color:var(--color-accent-primary)] hover:underline">System Status</a>
            </li>
          </ul>
          <p className="mt-4">
            Questions about these risks? Contact us at{" "}
            <a
              href="mailto:risk@hypertrader.io"
              className="text-[color:var(--color-accent-primary)] hover:underline"
            >
              risk@hypertrader.io
            </a>
          </p>
        </div>
      </Section>

      {/* Last Updated */}
      <Section className="border-t border-[color:var(--color-line-muted)] pt-8">
        <p className="text-center text-xs text-black/50 dark:text-white/50">
          Last Updated: October 16, 2025 | Version 1.0
        </p>
      </Section>
    </div>
  );
}
