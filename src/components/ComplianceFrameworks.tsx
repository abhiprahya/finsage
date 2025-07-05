import React, { useState } from 'react';
import { BookOpen, Shield, AlertTriangle, CheckCircle, ExternalLink, Download, Filter, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { User } from '../App';

interface ComplianceFrameworksProps {
  user: User;
}

export const ComplianceFrameworks: React.FC<ComplianceFrameworksProps> = ({ user }) => {
  const [selectedFramework, setSelectedFramework] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const frameworks = [
    {
      id: 'irdai',
      name: 'IRDAI Guidelines',
      type: 'Mandatory',
      appliesTo: 'Insurers',
      description: 'Insurance Regulatory and Development Authority guidelines for cloud adoption and data management',
      finopsImpact: 'Data localization infra cost tracking, DR/BCP cost narratives',
      status: 'active',
      lastUpdated: '2024-03-15',
      nextReview: '2024-09-15',
      costImpact: 45000,
      requirements: [
        'Data localization within India',
        'Disaster Recovery infrastructure',
        'Business Continuity Planning',
        'Regular audit and compliance reporting',
        'Encryption of sensitive data'
      ],
      finopsConsiderations: [
        'Track costs for India-specific cloud regions',
        'Monitor DR infrastructure spending',
        'Allocate costs for compliance auditing',
        'Budget for data encryption services'
      ]
    },
    {
      id: 'rbi',
      name: 'RBI Cloud Guidelines',
      type: 'Mandatory',
      appliesTo: 'Banks, NBFCs, Fintech',
      description: 'Reserve Bank of India guidelines for cloud computing adoption in financial services',
      finopsImpact: 'DR infra, compliance infra forecasting, cost audits',
      status: 'active',
      lastUpdated: '2024-02-20',
      nextReview: '2024-08-20',
      costImpact: 78000,
      requirements: [
        'Board-approved cloud adoption strategy',
        'Data localization requirements',
        'Robust governance framework',
        'Risk management and audit trails',
        'Exit strategy and data portability'
      ],
      finopsConsiderations: [
        'Budget for enhanced governance tools',
        'Track compliance infrastructure costs',
        'Monitor audit and reporting expenses',
        'Plan for data migration costs'
      ]
    },
    {
      id: 'pci',
      name: 'PCI-DSS 4.0',
      type: 'Mandatory',
      appliesTo: 'Payments, Wallets',
      description: 'Payment Card Industry Data Security Standard for protecting cardholder data',
      finopsImpact: 'Tokenization/encryption infra cost mapping',
      status: 'active',
      lastUpdated: '2024-03-31',
      nextReview: '2025-03-31',
      costImpact: 42000,
      requirements: [
        'Secure network architecture',
        'Cardholder data protection',
        'Vulnerability management',
        'Access control measures',
        'Regular monitoring and testing'
      ],
      finopsConsiderations: [
        'Track tokenization service costs',
        'Monitor encryption infrastructure',
        'Budget for security scanning tools',
        'Allocate costs for compliance testing'
      ]
    },
    {
      id: 'meity',
      name: 'MeitY Cloud Policy',
      type: 'Mandatory',
      appliesTo: 'Govt BFSI cloud use',
      description: 'Ministry of Electronics and IT cloud policy for government and regulated sectors',
      finopsImpact: 'Empanelled CSP infra cost segregation',
      status: 'active',
      lastUpdated: '2024-01-10',
      nextReview: '2024-07-10',
      costImpact: 25000,
      requirements: [
        'Use of empanelled cloud service providers',
        'Data sovereignty compliance',
        'Security clearance requirements',
        'Regular compliance assessments'
      ],
      finopsConsiderations: [
        'Track costs by empanelled CSP',
        'Monitor compliance assessment fees',
        'Budget for security clearance processes',
        'Allocate costs for approved services only'
      ]
    },
    {
      id: 'dpdp',
      name: 'DPDP Act',
      type: 'Mandatory',
      appliesTo: 'BFSI + All sectors',
      description: 'Digital Personal Data Protection Act for personal data processing and protection',
      finopsImpact: 'Personal data infra spend tracking',
      status: 'active',
      lastUpdated: '2024-04-01',
      nextReview: '2024-10-01',
      costImpact: 32000,
      requirements: [
        'Consent management systems',
        'Data minimization practices',
        'Purpose limitation compliance',
        'Data breach notification systems',
        'Cross-border data transfer controls'
      ],
      finopsConsiderations: [
        'Track consent management platform costs',
        'Monitor data processing infrastructure',
        'Budget for breach detection systems',
        'Allocate costs for data governance tools'
      ]
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      type: 'Advisory',
      appliesTo: 'All regulated BFSI',
      description: 'International standard for information security management systems',
      finopsImpact: 'Secure infra cost optimization & audit alignment',
      status: 'recommended',
      lastUpdated: '2024-02-15',
      nextReview: '2024-08-15',
      costImpact: 18000,
      requirements: [
        'Information security management system',
        'Risk assessment and treatment',
        'Security controls implementation',
        'Continuous monitoring and improvement'
      ],
      finopsConsiderations: [
        'Budget for ISMS implementation',
        'Track security control costs',
        'Monitor audit and certification fees',
        'Allocate costs for continuous improvement'
      ]
    },
    {
      id: 'ccm',
      name: 'Cloud Controls Matrix',
      type: 'Advisory',
      appliesTo: 'All regulated BFSI',
      description: 'CSA Cloud Controls Matrix for cloud security assurance',
      finopsImpact: 'Secure infra cost optimization & audit alignment',
      status: 'recommended',
      lastUpdated: '2024-01-20',
      nextReview: '2024-07-20',
      costImpact: 15000,
      requirements: [
        'Cloud security controls mapping',
        'Vendor risk assessment',
        'Continuous compliance monitoring',
        'Security metrics and reporting'
      ],
      finopsConsiderations: [
        'Track cloud security tool costs',
        'Monitor vendor assessment expenses',
        'Budget for compliance monitoring',
        'Allocate costs for security reporting'
      ]
    },
    {
      id: 'finops',
      name: 'FinOps Foundation',
      type: 'Advisory',
      appliesTo: 'All regulated BFSI',
      description: 'FinOps Foundation framework for cloud financial management',
      finopsImpact: 'Secure infra cost optimization & audit alignment',
      status: 'recommended',
      lastUpdated: '2024-03-01',
      nextReview: '2024-09-01',
      costImpact: 12000,
      requirements: [
        'Cloud cost visibility and allocation',
        'Cost optimization practices',
        'Financial accountability culture',
        'Continuous cost management'
      ],
      finopsConsiderations: [
        'Implement cost management tools',
        'Track optimization initiatives',
        'Monitor training and certification costs',
        'Budget for FinOps platform licenses'
      ]
    }
  ];

  const complianceStats = [
    { name: 'Mandatory', value: 5, color: '#EF4444' },
    { name: 'Advisory', value: 3, color: '#3B82F6' },
  ];

  const costByFramework = frameworks.map(f => ({
    name: f.name.split(' ')[0],
    cost: f.costImpact,
    type: f.type
  }));

  const filteredFrameworks = frameworks.filter(framework => {
    const matchesSearch = framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         framework.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'mandatory' && framework.type === 'Mandatory') ||
                           (selectedCategory === 'advisory' && framework.type === 'Advisory');
    const matchesFramework = selectedFramework === 'all' || framework.id === selectedFramework;
    
    return matchesSearch && matchesCategory && matchesFramework;
  });

  const totalCostImpact = frameworks.reduce((sum, f) => sum + f.costImpact, 0);
  const mandatoryCount = frameworks.filter(f => f.type === 'Mandatory').length;
  const advisoryCount = frameworks.filter(f => f.type === 'Advisory').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            Compliance Frameworks & Guidelines
          </h1>
          <p className="text-gray-600">Comprehensive guide to BFSI compliance requirements and FinOps impact</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Guide</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">{frameworks.length}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{frameworks.length}</h3>
            <p className="text-gray-600 text-sm">Total Frameworks</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">{mandatoryCount}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{mandatoryCount}</h3>
            <p className="text-gray-600 text-sm">Mandatory Compliance</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">{advisoryCount}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{advisoryCount}</h3>
            <p className="text-gray-600 text-sm">Advisory Frameworks</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600">+15.2%</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">${totalCostImpact.toLocaleString()}</h3>
            <p className="text-gray-600 text-sm">Total Cost Impact</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search frameworks, requirements, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="mandatory">Mandatory</option>
            <option value="advisory">Advisory</option>
          </select>
          <select
            value={selectedFramework}
            onChange={(e) => setSelectedFramework(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Frameworks</option>
            {frameworks.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Type Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complianceStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {complianceStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {complianceStats.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.value} frameworks</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Impact by Framework */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Cost Impact by Framework</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costByFramework}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Monthly Cost']} />
                <Bar 
                  dataKey="cost" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Framework Details */}
      <div className="space-y-6">
        {filteredFrameworks.map((framework) => (
          <div key={framework.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">{framework.name}</h2>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      framework.type === 'Mandatory' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {framework.type}
                    </span>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      framework.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {framework.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{framework.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Applies to:</span>
                      <span className="ml-2 text-gray-600">{framework.appliesTo}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Last Updated:</span>
                      <span className="ml-2 text-gray-600">{framework.lastUpdated}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Monthly Cost Impact:</span>
                      <span className="ml-2 font-semibold text-orange-600">${framework.costImpact.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Key Requirements</h3>
                  <ul className="space-y-2">
                    {framework.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">FinOps Considerations</h3>
                  <ul className="space-y-2">
                    {framework.finopsConsiderations.map((consideration, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">FinOps Impact Summary</h4>
                <p className="text-sm text-orange-800">{framework.finopsImpact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role-Based Quick Access */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Access for {user.role}</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.role === 'CFO' && (
              <>
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <h3 className="font-medium text-gray-900 mb-2">Budget Impact Analysis</h3>
                  <p className="text-sm text-gray-600">View cost implications of all compliance requirements</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <h3 className="font-medium text-gray-900 mb-2">Regulatory ROI</h3>
                  <p className="text-sm text-gray-600">Analyze return on compliance investments</p>
                </div>
              </>
            )}
            
            {user.role === 'Compliance Officer' && (
              <>
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <h3 className="font-medium text-gray-900 mb-2">Compliance Checklist</h3>
                  <p className="text-sm text-gray-600">Track implementation status across frameworks</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <h3 className="font-medium text-gray-900 mb-2">Audit Preparation</h3>
                  <p className="text-sm text-gray-600">Generate compliance reports and documentation</p>
                </div>
              </>
            )}
            
            {user.role === 'FinOps Analyst' && (
              <>
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <h3 className="font-medium text-gray-900 mb-2">Cost Allocation</h3>
                  <p className="text-sm text-gray-600">Map compliance costs to business units</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <h3 className="font-medium text-gray-900 mb-2">Optimization Opportunities</h3>
                  <p className="text-sm text-gray-600">Identify cost savings within compliance constraints</p>
                </div>
              </>
            )}
            
            <div className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
              <h3 className="font-medium text-gray-900 mb-2">Framework Updates</h3>
              <p className="text-sm text-gray-600">Stay informed about regulatory changes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};