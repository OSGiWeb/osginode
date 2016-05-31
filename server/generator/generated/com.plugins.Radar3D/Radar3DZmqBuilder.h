#ifndef Radar3DZMQBUILDER_H
#define Radar3DZMQBUILDER_H

#include <QSharedPointer>
#include "ZmqBuilder.h"

class ZmqObject;
class Radar3DZmqBuilder : public ZmqBuilder {

    Q_OBJECT
public:
    Radar3DZmqBuilder();
    virtual ~Radar3DZmqBuilder();

    static Radar3DZmqBuilder* GetInstance();

    void BuildSender();
    void BuildReceiver();
    void BuildContext();
    ZmqObject* GetZmqObject() { return m_pZmqObject; }

public slots:
    void processZmqMessage(const QList<QByteArray>& msg);

private:
    static QSharedPointer<Radar3DZmqBuilder> m_pRadar3DZmqBuilder;
    ZmqObject* m_pZmqObject;

};

#endif // Radar3DZMQBUILDER_H
