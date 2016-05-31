#ifndef PluginMiddlewareZMQBUILDER_H
#define PluginMiddlewareZMQBUILDER_H

#include <QSharedPointer>
#include "ZmqBuilder.h"

class ZmqObject;
class PluginMiddlewareZmqBuilder : public ZmqBuilder {

    Q_OBJECT
public:
    PluginMiddlewareZmqBuilder();
    virtual ~PluginMiddlewareZmqBuilder();

    static PluginMiddlewareZmqBuilder* GetInstance();

    void BuildSender();
    void BuildReceiver();
    void BuildContext();
    ZmqObject* GetZmqObject() { return m_pZmqObject; }

public slots:
    void processZmqMessage(const QList<QByteArray>& msg);

private:
    static QSharedPointer<PluginMiddlewareZmqBuilder> m_pPluginMiddlewareZmqBuilder;
    ZmqObject* m_pZmqObject;

};

#endif // PluginMiddlewareZMQBUILDER_H
