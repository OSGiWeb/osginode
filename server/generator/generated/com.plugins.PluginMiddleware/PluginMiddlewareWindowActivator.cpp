/*=============================================================================

  OSGi GUI Application Template

=============================================================================*/
#include <QDebug>
#include <QtPlugin>
#include <ctkPluginContext.h>

#include "PluginMiddlewareWindowActivator.h"
#include "gui/PluginMiddlewareWindowWidgetPlugin.h"

//----------------------------------------------------------------------------
void PluginMiddlewareWindowActivator::start(ctkPluginContext* context)
{
  m_windowWiget = new PluginMiddlewareWindowWidgetPlugin();


  ctkDictionary props;
  props.insert(ctkPluginConstants::SERVICE_RANKING, 0);

  context->registerService(QStringList("IWidgetPlugin"),    // service-> class name: IWidgetPlugin
                           m_windowWiget, props);

  qDebug() << "Registered PluginMiddlewareWindow UI Plugin";
  qDebug("size=====%d", m_windowWiget->getCenterWindow().size());
  qDebug("title = %s",qPrintable((m_windowWiget->getCenterWindow()).at(0)->getTitle()));
}

//----------------------------------------------------------------------------
void PluginMiddlewareWindowActivator::stop(ctkPluginContext* context)
{
  Q_UNUSED(context)
  delete m_windowWiget;
}

#if QT_VERSION < QT_VERSION_CHECK(5,0,0)
  Q_EXPORT_PLUGIN2(com_plugins_PluginMiddlewareWindow, PluginMiddlewareWindowActivator)
#endif
