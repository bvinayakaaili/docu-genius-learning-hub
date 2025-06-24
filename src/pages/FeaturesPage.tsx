
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, MessageCircle, Zap, Users, Trophy, BookOpen, 
  FileText, Search, BarChart3, Clock, Shield, Smartphone,
  ArrowRight, CheckCircle 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturesPage = () => {
  const navigate = useNavigate();

  const mainFeatures = [
    {
      icon: <Upload className="h-8 w-8 text-blue-600" />,
      title: "Smart Document Processing",
      description: "Upload PDFs, Word documents, PowerPoint presentations, and more. Our AI instantly extracts and understands your content.",
      capabilities: ["PDF text extraction", "Multiple format support", "Batch processing", "OCR for scanned documents"],
      badge: "Core Feature"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-green-600" />,
      title: "Intelligent Q&A System",
      description: "Ask questions in natural language and get contextual answers based on your uploaded documents.",
      capabilities: ["Natural language queries", "Context-aware responses", "Multi-document search", "Follow-up questions"],
      badge: "AI Powered"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "AI Study Assistant",
      description: "Generate summaries, create study guides, and get key insights automatically from your materials.",
      capabilities: ["Auto-summarization", "Key concept extraction", "Study guide generation", "Topic clustering"],
      badge: "Premium"
    },
    {
      icon: <Search className="h-8 w-8 text-purple-600" />,
      title: "Advanced Search",
      description: "Find specific information across all your documents with semantic search capabilities.",
      capabilities: ["Semantic search", "Cross-document queries", "Relevance ranking", "Search history"],
      badge: "Enhanced"
    }
  ];

  const additionalFeatures = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaborative Learning",
      description: "Share documents and insights with classmates for group study sessions."
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "Monitor your learning progress and identify areas needing attention."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Learning Analytics",
      description: "Get insights into your study patterns and performance metrics."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Study Scheduling",
      description: "Smart recommendations for study timing and material review."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Your documents are encrypted and your privacy is protected."
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Friendly",
      description: "Access your study materials from any device, anywhere."
    }
  ];

  const integrations = [
    { name: "Google Drive", description: "Import directly from your Google Drive" },
    { name: "Dropbox", description: "Sync with your Dropbox files" },
    { name: "OneDrive", description: "Connect with Microsoft OneDrive" },
    { name: "Notion", description: "Export summaries to Notion pages" },
    { name: "Anki", description: "Generate flashcards for Anki" },
    { name: "Canvas LMS", description: "Import course materials from Canvas" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DocuGenius
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button onClick={() => navigate('/chat')} className="bg-blue-600 hover:bg-blue-700">
                Try Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Modern Learning
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover all the tools and capabilities that make DocuGenius the ultimate learning companion for students worldwide.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Core Features</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {feature.icon}
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                        <Badge variant="secondary" className="mt-2">{feature.badge}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 text-base">
                    {feature.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {feature.capabilities.map((capability, capIndex) => (
                      <div key={capIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">{capability}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Additional Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Seamless Integrations</h2>
            <p className="text-xl text-gray-600">Connect with your favorite tools and platforms</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{integration.name}</h3>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Backend Technology Note */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Powered by Your Proven Backend</h2>
          <p className="text-xl mb-6 opacity-90">
            This enhanced interface leverages your existing Streamlit backend with PyPDFLoader, OpenAI integration, 
            and all the tools you've already tested and verified to work effectively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => navigate('/chat')}
            >
              Try the Enhanced Interface
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start using DocuGenius today and transform how you learn and study.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate('/chat')}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
